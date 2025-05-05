import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useState } from 'react';
const DEFAULT_SETTINGS_CONTEXT = {
    useInterpolation: false,
    interpolationMultiplier: 1,
};
const SettingsContext = createContext(null);
export const SettingsProvider = (props) => {
    const [settings, setSettings] = useState(() => DEFAULT_SETTINGS_CONTEXT);
    const update = useCallback((key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    }, []);
    return (_jsx(SettingsContext.Provider, { value: { settings, update }, children: props.children }));
};
export const useSettingsProvider = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('You should use hook useSettingsProvider inside SettingsProvider');
    }
    return context;
};
