import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { lenisRef } from "../lib/lenis";
import { useMotionPrefs } from "../hooks/useMotionPrefs";

/**
 * Lenis smooth scroll, driven by gsap.ticker and synced to ScrollTrigger.
 * Not created at all under prefers-reduced-motion (native scroll).
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const { reducedMotion } = useMotionPrefs();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({ autoRaf: false });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  return children;
}
