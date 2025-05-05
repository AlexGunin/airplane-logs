import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { PlayButton } from '../components/play-button';
import { LoadButton } from '../components/load-button';
import { CsvParser } from '../services/csv/csv-parser';
import { FlyPointScheme, FlyScheme } from '../fly-scheme';
import { useInitCesium } from './hooks/use-init-cesium';
import { useClickPlay } from './hooks/use-click-play';
import { HUD } from '../components/hud/hud';
import { useState } from 'react';
import defaultFlightData from './flight.json';
import './cesium.css';
import { ShowTrajectoryButton } from '../components/show-trajectory-button';
import { Flex, Stack } from '@mantine/core';
import { CatmullRomService } from '../services/catmull-rom/catmull-rom-service';
import { SettingsButton } from '../components/settings-button';
import { useSettingsProvider } from '../providers/settings-provider';
import { safeParseArray } from '../utils/safe-parse';
const csvService = new CsvParser();
const catmullRomService = new CatmullRomService();
export const CesiumMap = () => {
    const viewer = useInitCesium();
    const { settings } = useSettingsProvider();
    const [flightData, setFlightData] = useState(() => FlyScheme.parse(defaultFlightData));
    const { isPlaying, onClickPlay, onClickStop, isFirstClick } = useClickPlay(viewer);
    const handleLoadFile = async (file) => {
        if (!file) {
            return;
        }
        try {
            const csv = await csvService.parse(file);
            const parsed = safeParseArray(csv.values, FlyPointScheme);
            let points = parsed;
            if (settings.useInterpolation && settings.interpolationMultiplier > 1) {
                points = await catmullRomService.smoothPoints(parsed, settings.interpolationMultiplier);
            }
            setFlightData(points);
            onClickPlay(points);
        }
        catch (err) {
            console.log('ERROR', err);
        }
    };
    const handleClickPlayButton = async () => {
        if (isPlaying) {
            onClickStop();
        }
        else if (isFirstClick.current &&
            settings.useInterpolation &&
            settings.interpolationMultiplier > 1) {
            const points = await catmullRomService.smoothPoints(flightData, settings.interpolationMultiplier);
            onClickPlay(points);
        }
        else {
            onClickPlay(flightData);
        }
        isFirstClick.current = false;
    };
    return (_jsxs("div", { id: "cesiumContainer", style: { width: '100vw', height: '100vh', position: 'relative' }, children: [_jsx(Flex, { style: { position: 'absolute', left: 5, top: 5, zIndex: 1, gap: 8 }, children: viewer ? _jsx(HUD, { viewer: viewer }) : null }), _jsxs(Stack, { style: { position: 'absolute', right: 5, top: 5, zIndex: 1, gap: 8 }, children: [_jsx(PlayButton, { isPlaying: isPlaying, onClick: handleClickPlayButton }), _jsx(LoadButton, { onLoad: handleLoadFile }), _jsx(SettingsButton, {}), viewer ? _jsx(ShowTrajectoryButton, { viewer: viewer }) : null] })] }));
};
