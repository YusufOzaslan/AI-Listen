import { useBoolean } from '@chakra-ui/react';
import { ElementRef, useEffect, useRef, useState } from 'react';

export const useAudio = () => {
  const audioRef = useRef<ElementRef<'audio'>>(null);
  const trackRef = useRef<ElementRef<'input'>>(null);
  const [isPaused, setIsPaused] = useBoolean(true);
  const [canPlay, setCanPlay] = useBoolean(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.playbackRate = speed;
    }
  }, [speed]);

  const getAudio = () => {
    if (!audioRef.current) throw Error('Audio not available');
    return audioRef.current;
  };

  const getTrack = () => {
    if (!trackRef.current) throw Error('Track not available');
    return trackRef.current;
  };

  const play = () => {
    if (!isPaused) return;
    getAudio().play();
    setIsPaused.off();
  };

  const pause = () => {
    if (isPaused) return;
    getAudio().pause();
    setIsPaused.on();
  };

  const changeSpeed = (speedVal: number) => {
    if (speedVal > 2 || speedVal < 0.2) {
      setSpeed(1);
    } else setSpeed(speedVal);
  };

  const adjustTime = (delta: -1 | 1) => () => {
    if (isPaused) return;

    const step = getAudio().duration * 0.05;
    getAudio().currentTime += step * delta;

    if ([0, getAudio().duration].includes(getAudio().currentTime)) {
      getAudio().currentTime = 0;
      pause();
    }
  };

  const fastForward = adjustTime(1);
  const rewind = adjustTime(-1);

  const changeTime = (time: number) => {
    getAudio().currentTime = time;
    getTrack().value = time.toString();
    setCurrentTime(time);
  };

  const handleEnded = () => {
    if (getAudio().currentTime < getAudio().duration) return;
    setIsPaused.on();
  };

  const handleCanPlay = () => {
    setCanPlay.on();
    setAudioDuration(getAudio().duration);
  };

  const handleTimeUpdate = (event: any) => {
    setCurrentTime(Number(event.target.currentTime));
  };

  return {
    audioRef,
    trackRef,
    isPaused,
    canPlay,
    audioDuration,
    currentTime,
    play,
    pause,
    fastForward,
    rewind,
    changeTime,
    handleCanPlay,
    handleTimeUpdate,
    handleEnded,
    changeSpeed,
  };
};
