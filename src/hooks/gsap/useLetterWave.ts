import { useEffect } from "react";
import gsap from "gsap";

export const useLetterWave = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;
    const letters = ref.current.querySelectorAll("span");

    gsap.to(letters, {
      y: -12,
      repeat: -1,
      yoyo: true,
      stagger: 0.05,
      duration: 0.5,
      ease: "sine.inOut",
    });
  }, [ref]);
};
