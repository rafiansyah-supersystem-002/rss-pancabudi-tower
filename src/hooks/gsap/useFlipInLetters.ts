import { useEffect } from "react";
import gsap from "gsap";

export const useFlipInLetters = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;
    const letters = ref.current.querySelectorAll("span");

    gsap.from(letters, {
      rotateX: -90,
      opacity: 0,
      transformOrigin: "top center",
      duration: 0.6,
      stagger: 0.05,
      ease: "power3.out",
    });
  }, [ref]);
};
