import { useRef } from "react";
import { stack } from "../../data/content";
import { FULL_MOTION_QUERY, useMotionPrefs } from "../../hooks/useMotionPrefs";
import { gsap, ScrollTrigger, useGSAP } from "../../lib/gsap";
import { PLATE } from "../../lib/plates";
import { STACK_PHASE, STACK_TILT, stackProgress } from "../../lib/stackProgress";
import SectionHeading from "../ui/SectionHeading";
import HeroSection from "./HeroSection";
import Marquee from "./Marquee";
import StackSection from "./StackSection";

const ELEVATION_END = Math.PI / 6 - STACK_TILT;
// On-screen height of one plate at the tilted camera angle, in SVG units.
const PLATE_H_END =
  2 * PLATE.W * Math.sin(ELEVATION_END) +
  (PLATE.T / Math.cos(Math.PI / 6)) * Math.cos(ELEVATION_END);

const PLATE_H_REST = 2 * PLATE.H + PLATE.T;

/**
 * Hero + Marquee + 01 Stack.
 *
 * Desktop with motion: one 100svh stage, pinned for 200vh. The hero's plates
 * explode, slide left, and the stack heading and layer chips come in beside
 * them. One timeline, one ScrollTrigger.
 *
 * Under 900px or with reduced motion: plain document flow, nothing pinned,
 * and StackSection shows the exploded stack statically.
 */
export default function HeroStage() {
  const root = useRef<HTMLDivElement>(null);
  const { fullMotion } = useMotionPrefs();

  useGSAP(
    () => {
      const stage = root.current;
      if (!stage) return;

      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION_QUERY, () => {
        const q = gsap.utils.selector(stage);
        const mover = q("[data-stack-mover]")[0] as HTMLElement | undefined;
        const box = q("[data-stack-box]")[0] as HTMLElement | undefined;
        const heading = q("[data-stack-heading] header")[0] as HTMLElement | undefined;
        const marquee = q("[data-marquee]")[0] as HTMLElement | undefined;
        if (!mover || !box || !heading || !marquee) return;

        // Layout position relative to the stage, ignoring transforms (so it is
        // the same whatever the scroll position is when a refresh happens).
        const offset = (el: HTMLElement) => {
          let x = 0;
          let y = 0;
          for (let n: HTMLElement | null = el; n && n !== stage; n = n.offsetParent as HTMLElement | null) {
            x += n.offsetLeft;
            y += n.offsetTop;
          }
          return { x, y };
        };

        // Where the stack ends up, and how far apart the plates spread. All of
        // it depends on viewport size, so it is re-measured on every refresh.
        const measure = () => {
          const zoom = box.offsetWidth / PLATE.VIEW_W;
          const head = offset(heading);
          const from = offset(box);
          const top = head.y + heading.offsetHeight + 28;
          const bottom = offset(marquee).y - 96; // room for the last layer's chips
          const plateH = PLATE_H_END * zoom;
          const stepPx = gsap.utils.clamp(90, 200, (bottom - top - plateH) / 2);
          const centerY = top + plateH / 2 + stepPx;

          // SVG fallback (no WebGL): how much FURTHER apart than at rest each
          // plate moves. It has no camera tilt, so its plates stay taller;
          // the spread is trimmed by that difference to keep the same top edge.
          // (Step 4 set the full step here, which double-counted the resting
          // gap: found when testing with WebGL forced off.)
          const restPx = (PLATE.CY[1] - PLATE.CY[0]) * zoom;
          const untiltedExtra = ((PLATE_H_REST - PLATE_H_END) * zoom) / 2;
          const spreadPx = Math.max(stepPx - untiltedExtra - restPx, 0);
          stage.style.setProperty("--step-px", `${spreadPx}px`);
          stage.style.setProperty("--step-u", `${spreadPx / zoom}px`);
          stackProgress.stepWorld = stepPx / zoom / Math.cos(ELEVATION_END);

          return {
            dx: head.x - from.x,
            dy: centerY - (from.y + box.offsetHeight / 2),
          };
        };
        measure();

        const { explodeEnd, moveEnd } = STACK_PHASE;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          onUpdate: () => {
            stackProgress.current = tl.progress();
          },
          scrollTrigger: {
            id: "stack",
            trigger: stage,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onRefresh: measure,
          },
        });

        // 0 → 0.25: plates spread (the R3F scene reads stackProgress; --explode
        // drives the SVG fallback), hero copy fades and drifts up.
        tl.to(stage, { "--explode": 1, duration: explodeEnd }, 0)
          .to("[data-hero-copy]", { autoAlpha: 0, y: -40, duration: explodeEnd }, 0)
          // 0.25 → 0.6: stack slides left; heading, then each layer's chips.
          .to(
            mover,
            {
              x: () => measure().dx,
              y: () => measure().dy,
              duration: 0.2,
              ease: "power2.inOut",
            },
            explodeEnd,
          )
          .fromTo(
            "[data-stack-heading]",
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.12 },
            explodeEnd + 0.08,
          )
          .fromTo(
            "[data-layer-block]",
            { autoAlpha: 0, x: 40 },
            { autoAlpha: 1, x: 0, duration: 0.13, stagger: 0.05 },
            moveEnd - 0.23,
          )
          // 0.6 → 1: hold the exploded state (the handoff lands here in step 6).
          .to({}, { duration: 1 - moveEnd }, moveEnd);

        // Web fonts change text metrics, which changes where the pin ends.
        let alive = true;
        document.fonts.ready.then(() => {
          if (alive) ScrollTrigger.refresh();
        });

        return () => {
          alive = false;
          stackProgress.current = 0;
          stage.style.removeProperty("--explode");
          stage.style.removeProperty("--step-px");
          stage.style.removeProperty("--step-u");
        };
      });
    },
    { scope: root, dependencies: [fullMotion], revertOnUpdate: true },
  );

  return (
    <div
      ref={root}
      data-stage-root
      className={
        fullMotion ? "relative flex h-svh min-h-[600px] flex-col overflow-x-clip" : undefined
      }
    >
      <HeroSection pinned={fullMotion} />

      {fullMotion && (
        <div
          id="stack"
          data-stack-heading
          className="pointer-events-none invisible absolute inset-x-0 top-[88px]"
        >
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              index={stack.index}
              label={stack.label}
              title={stack.title}
              className="mb-0"
            />
          </div>
        </div>
      )}

      <Marquee />

      {!fullMotion && <StackSection />}
    </div>
  );
}
