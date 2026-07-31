import { useEffect } from "react";
import gsap from "gsap";

export interface GsapEntranceOptions {
  selector?: string;
  y?: number;
  opacity?: number;
  blur?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
}

export const useGsapFadeUp = (
  scope: React.RefObject<HTMLElement>,
  {
    selector = ".gsap-item",
    y = 24,
    opacity = 0,
    blur = 8,
    duration = 1.2,
    stagger = 0.15,
    delay = 0.2,
    ease = "power3.out",
  }: GsapEntranceOptions = {}
) => {
  useEffect(() => {
    if (!scope.current) return;

    const ctx = gsap.context(() => {
      gsap.from(selector, {
        y,
        opacity,
        filter: `blur(${blur}px)`,
        duration,
        stagger,
        delay,
        ease,
      });
    }, scope);

    return () => ctx.revert();
  }, [scope, selector, y, opacity, blur, duration, stagger, delay, ease]);
};
