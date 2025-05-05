import { jsx as _jsx } from "react/jsx-runtime";
import { ActionIconButton } from './action-icon-button';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
export const ShowTrajectoryButton = (props) => {
    const [isShow, setIsShow] = useState(true);
    const onClick = () => {
        setIsShow((prev) => !prev);
        props.viewer.toggleTrajectory();
    };
    return (_jsx(ActionIconButton, { "aria-label": "Show Trajectory", onClick: onClick, children: isShow ? _jsx(Eye, {}) : _jsx(EyeClosed, {}) }));
};
