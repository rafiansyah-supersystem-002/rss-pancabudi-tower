import { useEffect } from "react";
import gsap from "gsap";
import { Variants } from "framer-motion";

/* ---------------- Framer Motion Variants ---------------- */

export const gradualLetterVariant: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
    },
  }),
};

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
    },
  }),
};

/* ---------------- GSAP Hooks ---------------- */

/** Shine gradient sweep */
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

/** Neon flicker effect */
export const useNeonFlicker = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(ref.current, {
      opacity: 0.6,
      duration: 0.08,
    })
      .to(ref.current, {
        opacity: 1,
        textShadow: "0 0 8px #fff, 0 0 22px #0ff",
        duration: 0.12,
      });

  }, [ref]);
};

/** Letter wave bounce (children should be spans) */
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

/** Random glitch jitter */
export const useGlitchJitter = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const glitch = () => {
      gsap.fromTo(
        ref.current,
        { x: -2, y: 0 },
        {
          x: 2,
          y: 0,
          duration: 0.06,
          repeat: 6,
          yoyo: true,
          onComplete: () => {
            gsap.set(ref.current, { x: 0, y: 0 });
          },
        }
      );
    };

    const id = setInterval(glitch, 1200);
    return () => clearInterval(id);
  }, [ref]);
};

/** 3D flip-in letters (children spans) */
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
