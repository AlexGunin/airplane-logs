import { useEffect, useState } from 'react';
import { loadCesiumViewer } from '../load-cesium-viewer';
import { LogViewer } from '../../services/log-viewer';
export const useInitCesium = () => {
    const [viewer, setViewer] = useState(null);
    useEffect(() => {
        let internalViewer = null;
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
