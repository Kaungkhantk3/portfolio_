import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import type { StackLayer } from "../../data/content";
import { useMotionPrefs } from "../../hooks/useMotionPrefs";
import { ScrollTrigger } from "../../lib/gsap";
import { PLATE, plateLabelColors } from "../../lib/plates";
import LayerChips from "../ui/LayerChips";
import StackSvg from "../ui/StackSvg";

// three.js + R3F live in this chunk only. It is requested after first paint,
// on desktop with motion allowed, and never otherwise.
const StackScene = lazy(() => import("../three/StackScene"));

// How far the canvas extends past the plate box, so the exploded stack, float
// and parallax are not clipped. Absolutely positioned: no layout effect.
// (Step 3 used "-20%" on every side; the exploded stack needs more height.)
const BLEED = "-75% -20%";

// Width left for a layer's chips to the right of the stack once it has moved
// to the left edge: container width − plate box − leader line.
const LAYER_WIDTH =
  "calc(min(72rem, 100vw) - 3rem - clamp(170px, 45vw - 232px, 380px) - 84px)";

export default function StackStage({
  labels,
  layers,
}: {
  labels: string[];
  /** Layer chips revealed by the 01 Stack timeline (desktop with motion only). */
  layers?: StackLayer[];
}) {
  const { fullMotion } = useMotionPrefs();
  const [idle, setIdle] = useState(false);
  const [ready, setReady] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLLIElement | null)[]>([]);
  const onReady = useCallback((value: boolean) => {
    setReady(value);
    // Pin positions are measured again once the canvas is in.
    if (value) ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    if (!fullMotion) return;
    const start = () => setIdle(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 300);
    return () => clearTimeout(id);
  }, [fullMotion]);

  const mount3d = fullMotion && idle;
  const swapped = mount3d && ready;

  return (
    <div
      data-stack-mover
      data-3d={swapped ? "on" : "off"}
      className="group mx-auto w-[280px] max-w-full min-[900px]:mx-0 min-[900px]:w-[clamp(170px,45vw_-_232px,380px)]"
    >
      {/* Fixed-ratio box: the SVG and the canvas both size to this. */}
      <div
        ref={boxRef}
        data-stack-box
        className="relative"
        style={{ aspectRatio: `${PLATE.VIEW_W} / ${PLATE.VIEW_H}` }}
      >
        <StackSvg
          // The canvas fades in on top; the SVG is hidden only once it is covered,
          // so the plates never dim mid-swap.
          className={swapped ? "opacity-0 transition-opacity delay-500 duration-0" : ""}
        />

        {mount3d && (
          <div
            className={`pointer-events-none absolute transition-opacity duration-500 ${swapped ? "opacity-100" : "opacity-0"}`}
            style={{ inset: BLEED }}
          >
            <Suspense fallback={null}>
              <StackScene boxRef={boxRef} labelRefs={labelRefs} onReady={onReady} />
            </Suspense>
          </div>
        )}

        {/* ≥900px: a label to the right of each plate, with a leader line.
            With 3D on, the scene moves each <li> to follow its plate; without
            it, margin-top follows the same --explode the SVG plates use. */}
        <ul className="hidden min-[900px]:block">
          {labels.map((label, i) => (
            <li
              key={label}
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className="absolute left-full ml-1.5 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap will-change-transform group-data-[3d=on]:!mt-0"
              style={{
                top: `${((PLATE.CY[i] + PLATE.T / 2) / PLATE.VIEW_H) * 100}%`,
                marginTop: `calc(${i - 1} * var(--explode, 0) * var(--step-px, 0px))`,
                color: plateLabelColors[i],
              }}
            >
              <span className="h-px w-6 bg-current" aria-hidden="true" />
              <span className="font-mono text-[12px] leading-none">{label}</span>

              {fullMotion && layers?.[i] && (
                <div
                  data-layer-block
                  className="invisible absolute left-8 top-full mt-3 whitespace-normal"
                  style={{ width: LAYER_WIDTH }}
                >
                  <LayerChips layer={layers[i]} index={i} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* <900px: labels as a stacked list under the stack */}
      <ul className="mt-6 space-y-2 font-mono text-[12px] min-[900px]:hidden">
        {labels.map((label, i) => (
          <li
            key={label}
            className="flex items-center gap-3"
            style={{ color: plateLabelColors[i] }}
          >
            <span className="h-px w-6 bg-current" aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
