import { useEffect } from "react";
import gsap from "gsap";

export const useNeonFlicker = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(ref.current, { opacity: 0.6, duration: 0.08 })
      .to(ref.current, { opacity: 1, textShadow: "0 0 8px #fff, 0 0 22px #0ff", duration: 0.12 });
  }, [ref]);
};
