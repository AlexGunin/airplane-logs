import { jsx as _jsx } from "react/jsx-runtime";
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { CesiumMap } from './cesium/cesium-map';
import { SettingsProvider } from './providers/settings-provider';
const theme = createTheme({});
function App() {
    return (_jsx(SettingsProvider, { children: _jsx(MantineProvider, { theme: theme, defaultColorScheme: "dark", children: _jsx(CesiumMap, {}) }) }));
}
export default App;
