import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { useMotionPrefs } from "../../hooks/useMotionPrefs";

// Motion is only needed for these small-screen reveals (and the deck, on
// desktop), so it stays out of the main bundle and loads on idle.
const MotionReveal = lazy(() => import("./MotionReveal"));

/**
 * Small screens with motion: a simple fade-up when scrolled into view, once
 * (Motion whileInView). Desktop and reduced motion: a plain <div>; desktop
 * reveals are GSAP's job.
 *
 * It starts as a plain <div> and only switches to the Motion version once the
 * browser is idle, and only if the element is still below the viewport then.
 * Anything already on screen is left alone, so nothing visible ever blinks.
 */
export default function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { lightMotion } = useMotionPrefs();
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!lightMotion) return;
    const decide = () => {
      const el = ref.current;
      if (el && el.getBoundingClientRect().top > window.innerHeight) setAnimate(true);
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(decide, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(decide, 300);
    return () => clearTimeout(id);
  }, [lightMotion]);

  const plain = (
    <div ref={ref} className={className}>
      {children}
    </div>
  );

  if (!lightMotion || !animate) return plain;

  return (
    <Suspense fallback={plain}>
      <MotionReveal className={className}>{children}</MotionReveal>
    </Suspense>
  );
}
