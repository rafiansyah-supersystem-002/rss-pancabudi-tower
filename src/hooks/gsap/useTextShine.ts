import { useEffect } from "react";
import gsap from "gsap";

export const useTextShine = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      backgroundPosition: "200% 0",
      duration: 4,
      repeat: -1,
      ease: "linear",
    });
  }, [ref]);
};
