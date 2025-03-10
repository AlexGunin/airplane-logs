import { Cartesian3, Color, Ion, JulianDate, PathGraphics, SampledPositionProperty, TimeInterval, TimeIntervalCollection, VelocityOrientationProperty, } from 'cesium';
import { ION_ACCESS_TOKEN } from './constants';
Ion.defaultAccessToken = ION_ACCESS_TOKEN;
const TIME_STEP_IN_SECONDS = 30;
export class LogViewer {
    viewer;
    constructor(viewer) {
        this.viewer = viewer;
    }
    destroy() {
        this.viewer.destroy();
    }
    visualizePath(points) {
        const totalSeconds = TIME_STEP_IN_SECONDS * (points.length - 1);
        const [startTime, stopTime] = this.configureClock(totalSeconds);
        const positionProperty = this.samplePosition(points, startTime);
        const airplaneEntity = this.viewer.entities.add({
            availability: new TimeIntervalCollection([
                new TimeInterval({ start: startTime, stop: stopTime }),
            ]),
            position: positionProperty,
            model: {
                uri: `${ASSETS_PUBLIC_PATH}airplane.glb`,
            },
            orientation: new VelocityOrientationProperty(positionProperty),
            path: new PathGraphics({ width: 3 }),
        });
        this.viewer.trackedEntity = airplaneEntity;
    }
    configureClock = (seconds, start = JulianDate.fromIso8601('2020-03-09T23:10:00Z')) => {
        const stop = JulianDate.addSeconds(start, seconds, new JulianDate());
        this.viewer.clock.startTime = start.clone();
        this.viewer.clock.stopTime = stop.clone();
        this.viewer.clock.currentTime = start.clone();
        this.viewer.timeline.zoomTo(start, stop);
        this.viewer.clock.multiplier = 20;
        this.viewer.clock.shouldAnimate = true;
        return [start, stop];
    };
    samplePosition(points, start) {
        const positionProperty = new SampledPositionProperty();
        for (let i = 0; i < points.length; i++) {
            const dataPoint = points[i];
            const time = JulianDate.addSeconds(start, i * TIME_STEP_IN_SECONDS, new JulianDate());
            const position = Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height);
            positionProperty.addSample(time, position);
            this.viewer.entities.add({
                description: `Location: (${dataPoint.longitude}, ${dataPoint.latitude}, ${dataPoint.height})`,
                position: position,
                point: { pixelSize: 10, color: Color.RED },
            });
        }
        return positionProperty;
    }
}
