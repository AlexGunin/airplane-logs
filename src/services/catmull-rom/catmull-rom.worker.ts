import { FlyScheme } from '../../fly-scheme';
import * as Cesium from 'cesium';
import { isUtc } from '../../utils/iso';

const catmullRomSmoothPoints = (points: FlyScheme, subdivisions = 100): FlyScheme => {
  if (points.length < 4) return points;

  const result: FlyScheme = [];

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i < points.length - 2 ? points[i + 2] : p2;

    const cart0 = Cesium.Cartesian3.fromDegrees(p0.longitude, p0.latitude, p0.altitude);
    const cart1 = Cesium.Cartesian3.fromDegrees(p1.longitude, p1.latitude, p1.altitude);
    const cart2 = Cesium.Cartesian3.fromDegrees(p2.longitude, p2.latitude, p2.altitude);
    const cart3 = Cesium.Cartesian3.fromDegrees(p3.longitude, p3.latitude, p3.altitude);

    const spline = new Cesium.CatmullRomSpline({
      points: [cart0, cart1, cart2, cart3],
      times: [0, 1, 2, 3],
    });

    for (let j = 0; j < subdivisions; j++) {
      const t = 1 + j / subdivisions; // между p1 и p2
      const interpolated = spline.evaluate(t);

      const cartographic = Cesium.Cartographic.fromCartesian(interpolated);
      const lon = Cesium.Math.toDegrees(cartographic.longitude);
      const lat = Cesium.Math.toDegrees(cartographic.latitude);
      const alt = cartographic.height;

      const fraction = j / subdivisions;
      const newTime = Cesium.Math.lerp(p1.time!, p2.time!, fraction);

      // Интерполяция yaw/pitch/roll
      const pitch = Cesium.Math.lerp(p1.pitch ?? 0, p2.pitch ?? 0, fraction);
      const roll = Cesium.Math.lerp(p1.roll ?? 0, p2.roll ?? 0, fraction);
      const gForce = Cesium.Math.lerp(p1.gForce ?? 0, p2.gForce ?? 0, fraction);

      // Интерполяция UTC по времени
      let UTC: string | undefined = undefined;
      if (p1.UTC && p2.UTC && isUtc(p1.UTC) && isUtc(p2.UTC)) {
        const t1 = new Date(p1.UTC).getTime();
        const t2 = new Date(p2.UTC).getTime();
        const utcInterpolated = Cesium.Math.lerp(t1, t2, fraction);
        UTC = new Date(utcInterpolated).toISOString();
      }

      result.push({
        longitude: lon,
        latitude: lat,
        altitude: alt,
        pitch,
        roll,
        gForce,
        time: newTime,
        UTC,
      });
    }
  }

  result.push(points.at(-1)!);
  return result;
};

interface MessageData {
  points: FlyScheme;
  multiplier: number;
}

self.onmessage = (event: MessageEvent<MessageData>) => {
  const data = event.data;

  try {
    self.postMessage(catmullRomSmoothPoints(data.points, data.multiplier));
  } catch (err) {
    self.postMessage(data);
  }
};
