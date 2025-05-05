import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';

interface ISettingsState {
  useInterpolation: boolean;
  interpolationMultiplier: number;
}

interface ISettingsContext {
  settings: ISettingsState;
  update: (key: keyof ISettingsState, value: ISettingsState[keyof ISettingsState]) => void;
}

const DEFAULT_SETTINGS_CONTEXT: ISettingsState = {
  useInterpolation: false,
  interpolationMultiplier: 1,
};

const SettingsContext = createContext<ISettingsContext | null>(null);

export const SettingsProvider = (props: PropsWithChildren) => {
  const [settings, setSettings] = useState(() => DEFAULT_SETTINGS_CONTEXT);

  const update = useCallback(
    <Key extends keyof ISettingsState>(key: Key, value: ISettingsState[Key]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  return (
    <SettingsContext.Provider value={{ settings, update }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export const useSettingsProvider = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('You should use hook useSettingsProvider inside SettingsProvider');
  }

  return context;
};
