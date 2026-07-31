import { useEffect } from "react";
import gsap from "gsap";

export const useGlitchJitter = (ref: React.RefObject<HTMLElement>) => {
    useEffect(() => {
        if (!ref.current) return;

        const glitch = () => {
            void gsap.fromTo(
                ref.current!,
                { x: -2, y: 0 },
                {
                    x: 2,
                    y: 0,
                    duration: 0.06,
                    repeat: 6,
                    yoyo: true,
                    onComplete: () => {
                        void gsap.set(ref.current!, { x: 0, y: 0 });
                    },
                },
            );
        };

        const id = setInterval(glitch, 1200);
        return () => clearInterval(id);
    }, [ref]);
};
