import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useMotionPrefs } from "../../hooks/useMotionPrefs";
import { PLATE, plateLabelColors } from "../../lib/plates";
import StackSvg from "../ui/StackSvg";

// three.js + R3F live in this chunk only. It is requested after first paint,
// on desktop with motion allowed, and never otherwise.
const StackScene = lazy(() => import("../three/StackScene"));

// How far the canvas extends past the SVG box on every side, so float and
// parallax are not clipped. It is absolutely positioned: no layout effect.
const BLEED = "-20%";

export default function StackStage({ labels }: { labels: string[] }) {
  const { fullMotion } = useMotionPrefs();
  const [idle, setIdle] = useState(false);
  const [ready, setReady] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLLIElement | null)[]>([]);
  const onReady = useCallback((value: boolean) => setReady(value), []);

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
      role="img"
      aria-label={`Three stacked layers: ${labels.join(", ")}`}
      className="mx-auto w-[280px] max-w-full min-[900px]:mx-0 min-[900px]:w-[clamp(170px,45vw_-_232px,380px)]"
    >
      {/* Fixed-ratio box: the SVG and the canvas both size to this. */}
      <div
        ref={boxRef}
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

        {/* ≥900px: labels to the right of each plate, with a leader line */}
        <ul className="hidden min-[900px]:block">
          {labels.map((label, i) => (
            <li
              key={label}
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className="absolute left-full ml-1.5 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap font-mono text-[12px] leading-none will-change-transform"
              style={{
                top: `${((PLATE.CY[i] + PLATE.T / 2) / PLATE.VIEW_H) * 100}%`,
                color: plateLabelColors[i],
              }}
            >
              <span className="h-px w-6 bg-current" aria-hidden="true" />
              {label}
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
