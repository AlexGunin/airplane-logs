import { LogViewer } from '../services/log-viewer';
import { ActionIconButton } from './action-icon-button';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';

interface ShowTrajectoryButtonProps {
  viewer: LogViewer;
}

export const ShowTrajectoryButton = (props: ShowTrajectoryButtonProps) => {
  const [isShow, setIsShow] = useState(true);

  const onClick = () => {
    setIsShow((prev) => !prev);
    props.viewer.toggleTrajectory();
  };

  return (
    <ActionIconButton aria-label="Show Trajectory" onClick={onClick}>
      {isShow ? <Eye /> : <EyeClosed />}
    </ActionIconButton>
  );
};
