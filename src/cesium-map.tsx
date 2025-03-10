import { useEffect, useRef } from 'react';

import 'cesium/Build/Cesium/Widgets/widgets.css';
import { LogViewer } from './log-viewer';
import { loadCesiumViewer } from './load-cesium-viewer';
import flightData from './flight.json';

export const CesiumMap = () => {
  const viewerRef = useRef<LogViewer | null>(null);

  useEffect(() => {
    if (!viewerRef.current) {
      loadCesiumViewer().then((viewer) => {
        viewerRef.current = new LogViewer(viewer);

        viewerRef.current.visualizePath(flightData);
      });
    }

    return () => {
      viewerRef.current?.destroy();
      viewerRef.current = null;
    };
  }, []);

  return <div id="cesiumContainer" style={{ width: '100vw', height: '100vh' }} />;
};
