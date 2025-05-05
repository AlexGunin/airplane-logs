import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment, useEffect, useState } from 'react';
import { Text, SimpleGrid } from '@mantine/core';
import { HUD_CONFIG } from './config';
export const HUD = (props) => {
    const [hud, setHUD] = useState(null);
    useEffect(() => {
        return props.viewer.onTick(setHUD);
    }, []);
    if (!hud)
        return null;
    return (_jsx(SimpleGrid, { cols: 2, p: "xs", bg: "#303336", spacing: "xs", style: {
            color: 'white',
            borderRadius: 8,
            width: 220,
        }, children: HUD_CONFIG.map((item) => {
            const value = hud[item.key];
            if (value === undefined) {
                return null;
            }
            return (_jsxs(Fragment, { children: [_jsx(Text, { children: item.title }), item.render ? item.render(value) : value] }, item.key));
        }) }));
};
