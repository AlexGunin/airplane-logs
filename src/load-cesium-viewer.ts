import { createOsmBuildingsAsync, createWorldTerrainAsync, Viewer } from 'cesium';

const initBuildings = async (viewer: Viewer) => {
  try {
    const osmBuildings = await createOsmBuildingsAsync();
    viewer.scene.primitives.add(osmBuildings);
  } catch (err) {
    console.error('ERROR', err);
  }
};

export const loadCesiumViewer = async () => {
  const terrain = await createWorldTerrainAsync();

  const viewer = new Viewer('cesiumContainer', {
    terrainProvider: terrain,
  });

  await initBuildings(viewer);

  return viewer;
};
