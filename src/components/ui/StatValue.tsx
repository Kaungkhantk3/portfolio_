import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { REDUCED_QUERY } from "../../hooks/useMotionPrefs";

/* Step 3 version (Motion). Replaced in step 3b by GSAP, which is already in the
   main bundle, so Motion only loads with the components that need it.

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { useMotionPrefs } from "../../hooks/useMotionPrefs";

export default function StatValue({ value, decimals = 0 }: { value: number; decimals?: number }) {
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
*/

/** Counts up once when it first scrolls into view. Static with reduced motion. */
export default function StatValue({
  value,
  decimals = 0,
}: {
  value: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`not ${REDUCED_QUERY}`, () => {
        const counter = { v: 0 };
        const render = () => {
          el.textContent = counter.v.toFixed(decimals);
        };
        render(); // start from 0 before first paint, so it never flashes the final value
        gsap.to(counter, {
          v: value,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: render,
          scrollTrigger: { trigger: el, start: "top bottom", once: true },
        });
        return () => {
          el.textContent = value.toFixed(decimals);
        };
      });
    },
    { dependencies: [value, decimals] },
  );

  return <span ref={ref}>{value.toFixed(decimals)}</span>;
}
