import { Play, Pause } from 'lucide-react';
import { ActionIconButton } from './action-icon-button';

interface PlayButtonProps {
  isPlaying: boolean;
  onClick: VoidFunction;
}

export const PlayButton = (props: PlayButtonProps) => {
  return (
    <ActionIconButton aria-label="Play" onClick={props.onClick}>
      {props.isPlaying ? <Pause /> : <Play />}
    </ActionIconButton>
  );
};
