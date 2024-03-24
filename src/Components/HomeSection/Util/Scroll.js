import { useState, useEffect } from "react";

export const useVideoScrollControl = (videoRef,initialPlayThreshold = 200) => {
  const [play, setPlay] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const videoOffsetTop = videoRef.current.getBoundingClientRect().top;

        const dynamicThreshold = videoOffsetTop + initialPlayThreshold;

        const scrollPosition = window.scrollY;

        if (scrollPosition > dynamicThreshold) {
          setPlay(false);
        } else {
          setPlay(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [initialPlayThreshold]);

  return play;
};
