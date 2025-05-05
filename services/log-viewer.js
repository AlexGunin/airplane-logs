import { Cartesian3, ConstantProperty, Ion, JulianDate, Quaternion, SampledPositionProperty, TimeInterval, TimeIntervalCollection, } from 'cesium';
import { ION_ACCESS_TOKEN } from '../constants';
import * as Cesium from 'cesium';
import { isUtc } from '../utils/iso';
Ion.defaultAccessToken = ION_ACCESS_TOKEN;
const TIME_STEP_IN_SECONDS = 30;
const findTimeIndex = (points, currentTime) => {
    let low = 0;
    let high = points.length - 2; // последний возможный i
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const t0 = points[mid].time;
        const t1 = points[mid + 1].time;
        if (t0 <= currentTime && currentTime < t1) {
            return mid;
        }
        else if (currentTime < t0) {
            high = mid - 1;
        }
        else {
            low = mid + 1;
        }
    }
    return -1;
};
const isValidPointCoords = (point) => {
    return [point.longitude, point.latitude, point.altitude].every((item) => typeof item === 'number' && isFinite(item));
};
export class LogViewer {
    viewer;
    state = 'idle';
    onTickCallback;
    rawPoints;
    trajectory;
    clockMode = 'mock';
    currentFlightState = {
        index: 0,
        position: new Cartesian3(0, 0, 0),
        data: null,
    };
    constructor(viewer) {
        this.viewer = viewer;
    }
    onTick(callback) {
        this.onTickCallback = callback;
        return () => (this.onTickCallback = undefined);
    }
    destroy() {
        this.viewer.destroy();
    }
    visualizePath(points) {
        if (points.length < 2) {
            return;
        }
        if (this.state === 'stopped' && points === this.rawPoints) {
            this.state = 'active';
            this.viewer.clock.shouldAnimate = true;
            return;
        }
        this.rawPoints = points;
        const [startTime, stopTime] = this.configureClock(points);
        const positionProperty = this.samplePosition(points, startTime);
        this.clear();
        this.viewer.trackedEntity = this.viewer.entities.add({
            availability: new TimeIntervalCollection([
                new TimeInterval({ start: startTime, stop: stopTime }),
            ]),
            position: positionProperty,
            model: {
                uri: `${ASSETS_PUBLIC_PATH}airplane.glb`,
                minimumPixelSize: 64,
            },
        });
        this.trajectory = this.viewer.scene.primitives.add(new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                geometry: new Cesium.PolylineGeometry({
                    positions: points.map((p) => Cartesian3.fromDegrees(p.longitude, p.latitude, p.altitude)),
                    width: 2,
                    vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
                }),
            }),
            appearance: new Cesium.PolylineMaterialAppearance({
                material: Cesium.Material.fromType('Color', {
                    color: Cesium.Color.WHITE,
                }),
            }),
        }));
        this.state = 'active';
    }
    stop() {
        this.state = 'stopped';
        this.viewer.clock.shouldAnimate = false;
    }
    toggleTrajectory() {
        if (!this.trajectory) {
            return;
        }
        this.trajectory.show = !this.trajectory.show;
    }
    clear() {
        if (this.viewer.trackedEntity) {
            this.viewer.entities.remove(this.viewer.trackedEntity);
        }
        if (this.trajectory) {
            this.viewer.scene.primitives.remove(this.trajectory);
        }
    }
    handleTick = () => {
        if (!this.rawPoints)
            return;
        const seconds = Cesium.JulianDate.secondsDifference(this.viewer.clock.currentTime, this.viewer.clock.startTime);
        const index = findTimeIndex(this.rawPoints, seconds);
        const isUpdated = this.updateCurrentFlightState(index);
        if (!isUpdated) {
            return;
        }
        const point = this.rawPoints[index];
        const nextPoint = this.rawPoints[index + 1];
        if (this.viewer.trackedEntity && point && nextPoint) {
            this.viewer.trackedEntity.orientation = new ConstantProperty(this.getOrientation(point, nextPoint));
        }
        if (point && this.onTickCallback) {
            this.onTickCallback(point);
        }
    };
    configureClock = (points) => {
        const firstPoint = points[0];
        this.clockMode = this.getClockMode(firstPoint);
        const [start, stop] = this.getStartAndStop(points);
        this.viewer.clock.startTime = start.clone();
        this.viewer.clock.stopTime = stop.clone();
        this.viewer.clock.currentTime = start.clone();
        this.viewer.timeline.zoomTo(start, stop);
        this.viewer.clock.multiplier = 5;
        this.viewer.clock.shouldAnimate = true;
        this.viewer.clock.onTick.addEventListener(this.handleTick);
        return [start, stop];
    };
    samplePosition(points, start) {
        const positionProperty = new SampledPositionProperty();
        positionProperty.setInterpolationOptions({
            interpolationDegree: 3,
        });
        for (let i = 0; i < points.length; i++) {
            const dataPoint = points[i];
            const time = this.getPointTime(dataPoint, i, start);
            const position = Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.altitude);
            positionProperty.addSample(time, position);
            // this.viewer.entities.add({
            //   description: `Location: (${dataPoint.longitude}, ${dataPoint.latitude}, ${dataPoint.altitude})`,
            //   position: position,
            //   point: {
            //     pixelSize: 6,
            //     color: Color.BLUE.withAlpha(0.7),
            //     scaleByDistance: new Cesium.NearFarScalar(1, 1, 1_000, 1),
            //   },
            // });
        }
        return positionProperty;
    }
    getClockMode = (point) => {
        if (point.UTC) {
            return isUtc(point.UTC) ? 'utc' : point.time === undefined ? 'mock' : 'seconds';
        }
        return point.time === undefined ? 'mock' : 'seconds';
    };
    getStartAndStop(points) {
        const firstPoint = points[0];
        const lastPoint = points.at(-1);
        const start = this.getStartTime(firstPoint);
        return [start, this.getPointTime(lastPoint, points.length - 1, start)];
    }
    getPointTime(point, index, start) {
        switch (this.clockMode) {
            case 'utc': {
                return JulianDate.fromIso8601(point.UTC);
            }
            case 'seconds': {
                return JulianDate.addSeconds(start, point.time, new JulianDate());
            }
            case 'mock': {
                return JulianDate.addSeconds(start, TIME_STEP_IN_SECONDS * index, new JulianDate());
            }
            default: {
                return new JulianDate();
            }
        }
    }
    getStartTime(firstPoint) {
        return this.clockMode === 'utc'
            ? JulianDate.fromIso8601(firstPoint.UTC)
            : JulianDate.fromIso8601(new Date().toISOString());
    }
    getOrientation(point, nextPoint) {
        if (!isValidPointCoords(point) || !isValidPointCoords(nextPoint)) {
            console.warn('Invalid coords for orientation:', point, nextPoint);
            return Quaternion.IDENTITY;
        }
        const pos = Cesium.Cartesian3.fromDegrees(point.longitude, point.latitude, point.altitude);
        const nextPos = Cesium.Cartesian3.fromDegrees(nextPoint.longitude, nextPoint.latitude, nextPoint.altitude);
        const dir = Cesium.Cartesian3.subtract(nextPos, pos, new Cesium.Cartesian3());
        try {
            Cesium.Cartesian3.normalize(dir, dir);
        }
        catch (err) {
            console.error(err);
        }
        const geodesic = new Cesium.EllipsoidGeodesic(Cesium.Cartographic.fromDegrees(point.longitude, point.latitude), Cesium.Cartographic.fromDegrees(nextPoint.longitude, nextPoint.latitude));
        const heading = geodesic.startHeading - Cesium.Math.PI_OVER_TWO;
        const pitch = point.pitch === undefined ? 0 : Cesium.Math.toRadians(point.pitch);
        const roll = point.roll === undefined ? 0 : Cesium.Math.toRadians(point.roll);
        const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        return Cesium.Transforms.headingPitchRollQuaternion(pos, hpr);
    }
    updateCurrentFlightState(index) {
        if (this.currentFlightState.index === index || !this.rawPoints) {
            return false;
        }
        const point = this.rawPoints[index];
        if (!point) {
            return false;
        }
        this.currentFlightState.index = index;
        this.currentFlightState.position = Cesium.Cartesian3.fromDegrees(point.longitude, point.latitude, point.altitude);
        this.currentFlightState.pitch = point.pitch;
        this.currentFlightState.roll = point.roll;
        this.currentFlightState.data = point;
        return true;
    }
}
