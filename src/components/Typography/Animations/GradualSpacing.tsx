'use client';

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { gradualLetterVariant } from "@/hooks/framer/variants";

type Props = {
  text: string;
  style?: React.CSSProperties;
};

export function GradualSpacing({ text, style }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: 4,
        flexWrap: "wrap",
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={gradualLetterVariant}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={style}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}
