import { jsx as _jsx } from "react/jsx-runtime";
import { Play, Pause } from 'lucide-react';
import { ActionIconButton } from './action-icon-button';
export const PlayButton = (props) => {
    return (_jsx(ActionIconButton, { "aria-label": "Play", onClick: props.onClick, children: props.isPlaying ? _jsx(Pause, {}) : _jsx(Play, {}) }));
};
