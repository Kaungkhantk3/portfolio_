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

  // Pin lengths are measured in viewport heights, so after a resize the same
  // scroll position would fall on a different part of a pinned timeline (a
  // different project card, say). Keep the place instead: remember how far
  // through the active pin we were, and go back there once it is re-measured.
  useEffect(() => {
    let saved: { trigger: ScrollTrigger; progress: number } | null = null;

    const remember = () => {
      const trigger = ScrollTrigger.getAll().find((t) => t.pin && t.isActive);
      saved = trigger ? { trigger, progress: trigger.progress } : null;
    };
    const restore = () => {
      if (!saved) return;
      const { trigger, progress } = saved;
      saved = null;
      if (!ScrollTrigger.getAll().includes(trigger)) return;
      const y = trigger.start + progress * (trigger.end - trigger.start);
      if (Math.abs(y - window.scrollY) < 2) return;
      if (lenisRef.current) lenisRef.current.scrollTo(y, { immediate: true, force: true });
      else window.scrollTo(0, y);
    };

    ScrollTrigger.addEventListener("refreshInit", remember);
    ScrollTrigger.addEventListener("refresh", restore);
    return () => {
      ScrollTrigger.removeEventListener("refreshInit", remember);
      ScrollTrigger.removeEventListener("refresh", restore);
    };
  }, []);

  return children;
}
