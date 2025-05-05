import { useEffect, useRef, useState } from 'react';
import { loadCesiumViewer } from '../load-cesium-viewer';
import { LogViewer } from '../../services/log-viewer';

export const useInitCesium = () => {
  const [viewer, setViewer] = useState<LogViewer | null>(null);

  useEffect(() => {
    let internalViewer: LogViewer | null = null;

    if (!viewer) {
      loadCesiumViewer().then((viewer) => {
        internalViewer = new LogViewer(viewer);
        setViewer(internalViewer);
      });
    }

    return () => {
      internalViewer?.destroy();
      setViewer(null);
    };
  }, []);

  return viewer;
};
