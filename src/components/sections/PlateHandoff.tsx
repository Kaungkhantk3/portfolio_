import { useEffect, useRef, useState } from "react";
import { useMotionPrefs } from "../../hooks/useMotionPrefs";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { handoffEnabled, handoffState } from "../../lib/handoff";

/* Handoff timeline, as fractions of the scroll distance between the end of the
   stack pin and the start of the deck pin. */
const PLATE_FADE_END = 0.1; // the plate (and its sides) fades out under the ghost
const MORPH_END = 0.85; // ghost has reached card 01's rect
const CARD_IN_END = 0.93; // card 01 has faded in underneath the ghost
// 0.93 → 1: the ghost fades out. Crossfade total = 0.15 of the distance.

const RADIUS = 12; // card corner radius (rounded-xl)
const PLATE_FILL = [255, 106, 43]; // #FF6A2B, the plate's top face
const CARD_FILL = [22, 23, 26]; // #16171A, card surface
const PLATE_EDGE = [38, 39, 35]; // #262723
const CARD_EDGE = [255, 106, 43]; // accent border of the active card

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const rgb = (a: number[], b: number[], t: number) =>
  `rgb(${Math.round(mix(a[0], b[0], t))},${Math.round(mix(a[1], b[1], t))},${Math.round(mix(a[2], b[2], t))})`;

/** SVG path for a quad (x,y pairs) with rounded corners. */
function roundedQuad(q: number[], radius: number) {
  let d = "";
  for (let i = 0; i < 4; i++) {
    const [px, py] = [q[i * 2], q[i * 2 + 1]];
    const [ax, ay] = [q[((i + 3) % 4) * 2], q[((i + 3) % 4) * 2 + 1]]; // previous corner
    const [bx, by] = [q[((i + 1) % 4) * 2], q[((i + 1) % 4) * 2 + 1]]; // next corner
    const la = Math.hypot(ax - px, ay - py) || 1;
    const lb = Math.hypot(bx - px, by - py) || 1;
    const ra = Math.min(radius, la / 2);
    const rb = Math.min(radius, lb / 2);
    const inX = px + ((ax - px) / la) * ra;
    const inY = py + ((ay - py) / la) * ra;
    const outX = px + ((bx - px) / lb) * rb;
    const outY = py + ((by - py) / lb) * rb;
    d += `${i === 0 ? "M" : "L"}${inX.toFixed(2)} ${inY.toFixed(2)}Q${px.toFixed(2)} ${py.toFixed(2)} ${outX.toFixed(2)} ${outY.toFixed(2)}`;
  }
  return d + "Z";
}

/**
 * Plate → card 01 handoff (behind flags.enableFlipHandoff / ?handoff=1).
 *
 * Between the two pins, a "ghost" shape starts exactly on the top plate's top
 * face and morphs into card 01's box, then crossfades into the real card.
 *
 * Everything here is a pure function of the scroll position, recomputed every
 * frame from live measurements (the plate's projected face, card 01's rect,
 * the two pins' current start/end). So it reverses by itself, follows a
 * resize or refresh without a re-measure step, and cannot leave a ghost
 * behind after a fast flick.
 *
 * Desktop with motion only: the component renders nothing otherwise.
 */
export default function PlateHandoff() {
  const { fullMotion } = useMotionPrefs();
  const [enabled] = useState(handoffEnabled);
  const pathRef = useRef<SVGPathElement>(null);
  const on = fullMotion && enabled;

  useEffect(() => {
    const path = pathRef.current;
    if (!on || !path) return;

    handoffState.active = true;
    const quad = new Array<number>(8).fill(0);
    let card: HTMLElement | null = null;
    let topPlate: SVGGElement | null = null;
    let topLabel: HTMLElement | null = null;
    let shown = false;

    const setCardOpacity = (value: number | null) => {
      // `filter`, not `opacity`: the deck timeline owns the card's opacity.
      if (card) card.style.filter = value === null ? "" : `opacity(${value})`;
    };
    const setPlateOpacity = (value: number) => {
      handoffState.plateOpacity = value; // WebGL plate (read by the scene)
      if (topPlate) topPlate.style.opacity = value === 1 ? "" : String(value); // SVG fallback
      // The top layer's label and chips leave with their plate.
      if (topLabel) topLabel.style.opacity = value === 1 ? "" : String(value);
    };
    const hide = () => {
      if (!shown) return;
      shown = false;
      path.style.opacity = "0";
    };

    const tick = () => {
      const stack = ScrollTrigger.getById("stack");
      const work = ScrollTrigger.getById("work");
      card ??= document.querySelector<HTMLElement>("[data-card]");
      topPlate ??= document.querySelector<SVGGElement>('[data-stack-box] [data-plate="0"]');
      topLabel ??= document.querySelector<HTMLElement>("[data-stack-box] > ul > li");
      const mover = document.querySelector<HTMLElement>("[data-stack-mover]");

      // Until both pins (and the lazily loaded deck) exist there is nothing to
      // hand off to: leave everything as it is.
      if (!stack || !work || !card?.isConnected || !mover || work.start <= stack.end) {
        card = card?.isConnected ? card : null;
        hide();
        setPlateOpacity(1);
        return;
      }

      const p = clamp01((window.scrollY - stack.end) / (work.start - stack.end));

      if (p <= 0) {
        hide();
        setPlateOpacity(1);
        setCardOpacity(null);
        return;
      }
      if (p >= 1) {
        hide();
        setPlateOpacity(0);
        setCardOpacity(null);
        return;
      }

      // Start shape: the plate's top face, live. From the WebGL scene when it
      // is running, otherwise from the SVG polygon.
      let from = handoffState.quad;
      if (mover.dataset["3d"] !== "on") {
        const face = topPlate?.querySelector("[data-plate-top]")?.getBoundingClientRect();
        if (!face) return hide();
        const cx = (face.left + face.right) / 2;
        const cy = (face.top + face.bottom) / 2;
        from = [cx, face.top, face.right, cy, cx, face.bottom, face.left, cy];
      }

      // End shape: card 01's border box, live (inset half a pixel so the 1px
      // stroke lands exactly on the card's 1px border).
      const r = card.getBoundingClientRect();
      const to = [r.left + 0.5, r.top + 0.5, r.right - 0.5, r.top + 0.5, r.right - 0.5, r.bottom - 0.5, r.left + 0.5, r.bottom - 0.5];

      const linear = clamp01(p / MORPH_END);
      const t = 0.5 - Math.cos(Math.PI * linear) / 2; // sine in-out
      for (let i = 0; i < 8; i++) quad[i] = mix(from[i], to[i], t);

      path.setAttribute("d", roundedQuad(quad, RADIUS * t));
      path.setAttribute("fill", rgb(PLATE_FILL, CARD_FILL, t));
      path.setAttribute("stroke", rgb(PLATE_EDGE, CARD_EDGE, t));
      path.style.opacity = String(1 - clamp01((p - CARD_IN_END) / (1 - CARD_IN_END)));
      shown = true;

      setPlateOpacity(1 - clamp01(p / PLATE_FADE_END));
      setCardOpacity(clamp01((p - MORPH_END) / (CARD_IN_END - MORPH_END)));
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      handoffState.active = false;
      setPlateOpacity(1);
      setCardOpacity(null);
    };
  }, [on]);

  if (!on) return null;

  return (
    <svg
      data-handoff
      className="pointer-events-none fixed inset-0 z-40 h-full w-full"
      aria-hidden="true"
    >
      <path ref={pathRef} strokeWidth="1" style={{ opacity: 0 }} />
    </svg>
  );
}
