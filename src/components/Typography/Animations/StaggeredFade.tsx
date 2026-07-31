'use client';

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { fadeUpVariant } from "@/hooks/framer/variants";


type Props = {
  text: string;
  style?: React.CSSProperties;
};

export function StaggeredFade({ text, style }: Props) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      style={{ textAlign: "center", ...style }}
    >
      {text.split("").map((char, i) => (
        <motion.span key={i} custom={i} variants={fadeUpVariant}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
