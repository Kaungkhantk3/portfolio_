import { PLATE, PLATE_EDGE, plateFaces } from "../../lib/plates";

function PlatePolygons({ index, cy }: { index: number; cy: number }) {
  const { W, H, T, CX } = PLATE;
  const { top, left, right } = plateFaces[index];
  return (
    <g stroke={PLATE_EDGE} strokeWidth="1" strokeLinejoin="round">
      <polygon
        fill={left}
        points={`${CX - W},${cy} ${CX},${cy + H} ${CX},${cy + H + T} ${CX - W},${cy + T}`}
      />
      <polygon
        fill={right}
        points={`${CX + W},${cy} ${CX},${cy + H} ${CX},${cy + H + T} ${CX + W},${cy + T}`}
      />
      <polygon
        data-plate-top
        fill={top}
        points={`${CX},${cy - H} ${CX + W},${cy} ${CX},${cy + H} ${CX - W},${cy}`}
      />
    </g>
  );
}

/**
 * Static isometric three-plate stack. Permanent visual under 900px and with
 * reduced motion; on desktop the R3F canvas mounts over it at the same size.
 *
 * The plates spread apart with the --explode (0 → 1) and --step-u custom
 * properties set by the 01 Stack timeline, so the pin still reads correctly if
 * WebGL never becomes available.
 */
export default function StackSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${PLATE.VIEW_W} ${PLATE.VIEW_H}`}
      className={`block h-auto w-full overflow-visible ${className}`}
      aria-hidden="true"
    >
      {/* drawn bottom → top */}
      {[2, 1, 0].map((i) => (
        <g
          key={i}
          data-plate={i}
          style={{
            transform: `translateY(calc(${i - 1} * var(--explode, 0) * var(--step-u, 0px)))`,
          }}
        >
          <PlatePolygons index={i} cy={PLATE.CY[i]} />
        </g>
      ))}
    </svg>
  );
}

/** One plate on its own, for the static exploded list (mobile / reduced motion). */
export function PlateSvg({ index, className = "" }: { index: number; className?: string }) {
  const { H, T, VIEW_W } = PLATE;
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${2 * H + T + 2}`}
      className={`block h-auto w-full ${className}`}
      aria-hidden="true"
    >
      <PlatePolygons index={index} cy={H + 1} />
    </svg>
  );
}
