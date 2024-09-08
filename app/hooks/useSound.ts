import { useEffect, useState } from 'react';

export function useSound(soundUrl: string) {
  const [audio] = useState(new Audio(soundUrl));

  const play = () => {
    audio.currentTime = 0;
    audio.play();
  };

  useEffect(() => {
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  return play;
}