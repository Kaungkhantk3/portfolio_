import type { ReactNode } from "react";
import * as m from "motion/react-m";
import { domAnimation, LazyMotion } from "motion/react";

/** Fade-up when scrolled into view, once. Loaded lazily by Reveal. */
export default function MotionReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={className}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
