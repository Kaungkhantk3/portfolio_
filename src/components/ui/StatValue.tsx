import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { useMotionPrefs } from "../../hooks/useMotionPrefs";

/** Counts up once when it first scrolls into view. Static with reduced motion. */
export default function StatValue({
  value,
  decimals = 0,
}: {
  value: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const { reducedMotion } = useMotionPrefs();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reducedMotion) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = v.toFixed(decimals);
      },
    });
    return () => {
      controls.stop();
      el.textContent = value.toFixed(decimals);
    };
  }, [inView, reducedMotion, value, decimals]);

  return <span ref={ref}>{value.toFixed(decimals)}</span>;
}
