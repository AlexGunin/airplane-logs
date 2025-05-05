import { useRef, useState } from 'react';
import { LogViewer } from '../../services/log-viewer';
import { FlyScheme } from '../../fly-scheme';

export const useClickPlay = (viewer: LogViewer | null) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const isFirstClick = useRef(true);

  const onClickPlay = (data: FlyScheme) => {
    viewer?.visualizePath(data);
    setIsPlaying(true);
    isFirstClick.current = false;
  };

  const onClickStop = () => {
    viewer?.stop();
    setIsPlaying(false);
    isFirstClick.current = false;
  };

  return {
    onClickPlay,
    onClickStop,
    isPlaying,
    isFirstClick,
  };
};
