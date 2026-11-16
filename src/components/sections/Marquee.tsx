import { useEffect, useRef } from "react";
import { marquee } from "../../data/content";
import { useMotionPrefs } from "../../hooks/useMotionPrefs";
import { gsap } from "../../lib/gsap";
import { lenisRef } from "../../lib/lenis";

const COPIES = 4; // enough to fill very wide screens while one copy scrolls past
const BASE = 60; // px/s when idle
const BOOST = 14; // extra px/s per unit of Lenis velocity
const MAX = 900; // px/s cap
const EASE = 4; // how quickly speed settles back (higher = quicker)

/**
 * Infinite strip.
 * - Desktop with motion: position is driven every frame from lenis.velocity.
 *   Base speed when idle, faster in the direction of the scroll, eased back
 *   with a lerp, capped. Paused while offscreen.
 * - Small screens with motion: constant-speed CSS loop.
 * - Reduced motion: static.
 */
export default function Marquee() {
  const { fullMotion, lightMotion } = useMotionPrefs();
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = root.current;
    const el = track.current;
    if (!fullMotion || !wrap || !el) return;

    let x = 0;
    let speed = BASE;
    let direction = 1; // 1 = leftwards (scrolling down), -1 = rightwards
    let visible = true;
    let loop = el.scrollWidth / COPIES; // width of one copy

    const sizes = new ResizeObserver(() => {
      loop = el.scrollWidth / COPIES;
    });
    sizes.observe(el);
    const view = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    view.observe(wrap);

    const tick = (_time: number, deltaMs: number) => {
      if (!visible || !loop) return;
      const dt = Math.min(deltaMs, 50) / 1000;
      const velocity = lenisRef.current?.velocity ?? 0;
      if (Math.abs(velocity) > 0.5) direction = velocity > 0 ? 1 : -1;

      const target = gsap.utils.clamp(-MAX, MAX, direction * BASE + velocity * BOOST);
      speed += (target - speed) * (1 - Math.exp(-dt * EASE)); // lerp back

      x = (x - speed * dt) % loop;
      if (x > 0) x -= loop;
      el.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      sizes.disconnect();
      view.disconnect();
      el.style.transform = "";
    };
  }, [fullMotion]);

  return (
    <div
      ref={root}
      data-marquee
      className="shrink-0 overflow-hidden border-y border-line py-5"
      aria-hidden="true"
    >
      {/* Steps 1–6: one copy of the list, static.
      <div className="flex w-max items-center gap-6 whitespace-nowrap px-4 ...">
      */}
      <div
        ref={track}
        className={`flex w-max whitespace-nowrap font-display text-[24px] font-medium leading-none text-[#6F6D66] will-change-transform min-[900px]:text-[34px] ${lightMotion ? "marquee-loop" : ""}`}
      >
        {Array.from({ length: COPIES }, (_, copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-6 pr-6 min-[900px]:gap-8 min-[900px]:pr-8">
            {marquee.map((item) => (
              <span key={item} className="flex items-center gap-6 min-[900px]:gap-8">
                {item}
                <span className="text-[0.6em] text-accent">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
