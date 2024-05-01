import { useState, useEffect } from "react";
export interface ISegment {
  segmentIndex: number;
  wordCount: number;
}
export const useDisplayTextWithAudio = (
  audioRef: any,
  dialogues: {
    speaker: string;
    text: string;
  }[]
) => {
  const [displayedSegmentIndex, setDisplayedSegmentIndex] = useState(0);
  const wordsPerSegment = 4; // Her segmentteki kelime sayısı

  useEffect(() => {
    if (!audioRef.current) return;
    const ref = audioRef.current;

    const handleTimeUpdate = () => {
      const currentTime = audioRef.current.currentTime;

      let totalSegmentCount = 0;
      dialogues.forEach((dialogue) => {
        const words = dialogue.text.split(" ");
        const wordCount = words.length;
        const segmentCount = Math.ceil(wordCount / wordsPerSegment);
        totalSegmentCount += segmentCount;
      });

      const segmentDuration = audioRef.current.duration / totalSegmentCount; // Her segment için düşen süre

      const currentSegmentIndex = Math.floor(currentTime / segmentDuration); // Geçerli segment indeksi
      setDisplayedSegmentIndex(currentSegmentIndex);
    };

    audioRef.current?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      ref?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef, dialogues]);

  return { displayedSegmentIndex };
};