import { useRef, useState } from 'react';
export const useClickPlay = (viewer) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const isFirstClick = useRef(true);
    const onClickPlay = (data) => {
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
