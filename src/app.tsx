import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';
import { CesiumMap } from './cesium/cesium-map';
import { SettingsProvider } from './providers/settings-provider';

const theme = createTheme({});

function App() {
  return (
    <SettingsProvider>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <CesiumMap />
      </MantineProvider>
    </SettingsProvider>
  );
}

export default App;
