import { createOsmBuildingsAsync, createWorldTerrainAsync, Viewer } from 'cesium';
const initBuildings = async (viewer) => {
    try {
        const osmBuildings = await createOsmBuildingsAsync();
        viewer.scene.primitives.add(osmBuildings);
    }
    catch (err) {
        console.error('ERROR', err);
    }
};
export const loadCesiumViewer = async () => {
    const terrain = await createWorldTerrainAsync();
    const viewer = new Viewer('cesiumContainer', {
        terrainProvider: terrain,
        // shouldAnimate: false,
        baseLayerPicker: false,
        // timeline: false,
        // animation: false,
        infoBox: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
    });
    viewer.scene.skyAtmosphere.show = false;
    viewer.scene.globe.enableLighting = false;
    viewer.scene.fog.enabled = false;
    viewer.shadows = false;
    await initBuildings(viewer);
    return viewer;
};
