import { Variants } from "framer-motion";

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
