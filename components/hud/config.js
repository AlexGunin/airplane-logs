import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, NumberFormatter } from '@mantine/core';
export const HUD_CONFIG = [
    {
        key: 'UTC',
        title: 'UTC',
    },
    {
        key: 'altitude',
        title: 'Altitude',
        render: (altitude) => _jsx(NumberFormatter, { value: altitude, decimalScale: 2 }),
    },
    {
        key: 'longitude',
        title: 'Longitude',
        render: (longitude) => _jsx(NumberFormatter, { value: longitude, decimalScale: 6 }),
    },
    {
        key: 'latitude',
        title: 'Latitude',
        render: (latitude) => _jsx(NumberFormatter, { value: latitude, decimalScale: 6 }),
    },
    {
        key: 'pitch',
        title: 'Pitch',
        render: (pitch) => (_jsxs(Flex, { children: [_jsx(NumberFormatter, { value: pitch, decimalScale: 2 }), "\u00B0"] })),
    },
    {
        key: 'roll',
        title: 'Roll',
        render: (roll) => (_jsxs(Flex, { children: [_jsx(NumberFormatter, { value: roll, decimalScale: 2 }), "\u00B0"] })),
    },
    {
        key: 'gForce',
        title: 'GForce',
        render: (gForce) => (_jsxs(Flex, { children: [_jsx(NumberFormatter, { value: gForce, decimalScale: 2 }), "g"] })),
    },
];
