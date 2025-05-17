import { buildModuleUrl, 
// createOsmBuildingsAsync,
EllipsoidTerrainProvider, ProviderViewModel, UrlTemplateImageryProvider, Viewer, } from 'cesium';
import { VIEWER_CONTAINER_ID } from '../constants';
// const initBuildings = async (viewer: Viewer) => {
//   try {
//     const osmBuildings = await createOsmBuildingsAsync();
//     viewer.scene.primitives.add(osmBuildings);
//   } catch (err) {
//     console.error('ERROR', err);
//   }
// };
const tilesProvider = new ProviderViewModel({
    name: 'My Offline Tiles',
    iconUrl: buildModuleUrl('/cesium/Assets/Images/ion-credit.png'), // любая картинка для иконки
    tooltip: 'Мои локальные растровые тайлы',
    creationFunction: () => new UrlTemplateImageryProvider({
        url: 'https://air-logs.duckdns.org/services/world/tiles/{z}/{x}/{y}.png',
        minimumLevel: 0,
        maximumLevel: 8,
    }),
});
export const loadCesiumViewer = async () => {
    // const terrain = await createWorldTerrainAsync();
    const viewer = new Viewer(VIEWER_CONTAINER_ID, {
        imageryProviderViewModels: [tilesProvider],
        selectedImageryProviderViewModel: tilesProvider,
        // terrainProvider: terrain,
        terrainProvider: new EllipsoidTerrainProvider(),
        // shouldAnimate: false,
        baseLayerPicker: true,
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
    // await initBuildings(viewer);
    return viewer;
};
