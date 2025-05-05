import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Settings } from 'lucide-react';
import { ActionIconButton } from './action-icon-button';
import { Checkbox, Drawer, NumberInput, Stack, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSettingsProvider } from '../providers/settings-provider';
const DEFAULT_INTERPOLATION_MULTIPLIER = 10;
export const SettingsButton = () => {
    const [isOpened, { open, close }] = useDisclosure(false);
    const { settings, update } = useSettingsProvider();
    return (_jsxs(_Fragment, { children: [_jsx(Drawer, { opened: isOpened, onClose: close, position: "right", offset: 8, radius: "md", withCloseButton: false, children: _jsxs(Stack, { gap: "xs", children: [_jsx(Checkbox, { label: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0438\u043D\u0442\u0435\u0440\u043F\u043E\u043B\u044F\u0446\u0438\u044E \u043C\u0435\u0436\u0434\u0443 \u0442\u043E\u0447\u043A\u0430\u043C\u0438 ? (CatmulRom)", checked: settings.useInterpolation, onChange: (event) => update('useInterpolation', event.currentTarget.checked) }), _jsx(Transition, { mounted: settings.useInterpolation, children: (styles) => (_jsx(NumberInput, { style: styles, label: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043E\u0447\u043D\u044B\u0445 \u0442\u043E\u0447\u0435\u043A", defaultValue: DEFAULT_INTERPOLATION_MULTIPLIER, value: settings.interpolationMultiplier, min: 1, onChange: (value) => update('interpolationMultiplier', Number(value)) })) })] }) }), _jsx(ActionIconButton, { "aria-label": "Settings", onClick: open, children: _jsx(Settings, {}) })] }));
};
