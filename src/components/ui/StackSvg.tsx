import { PLATE, PLATE_EDGE, plateFaces } from "../../lib/plates";

/**
 * Static isometric three-plate stack. Permanent visual under 900px and with
 * reduced motion; on desktop the R3F canvas mounts over it at the same size.
 */
export default function StackSvg({ className = "" }: { className?: string }) {
  const { W, H, T, CX, VIEW_W, VIEW_H, CY } = PLATE;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className={`block h-auto w-full ${className}`}
      aria-hidden="true"
    >
      {/* drawn bottom → top */}
      {[2, 1, 0].map((i) => {
        const cy = CY[i];
        const { top, left, right } = plateFaces[i];
        return (
          <g key={i} stroke={PLATE_EDGE} strokeWidth="1" strokeLinejoin="round">
            <polygon
              fill={left}
              points={`${CX - W},${cy} ${CX},${cy + H} ${CX},${cy + H + T} ${CX - W},${cy + T}`}
            />
            <polygon
              fill={right}
              points={`${CX + W},${cy} ${CX},${cy + H} ${CX},${cy + H + T} ${CX + W},${cy + T}`}
            />
            <polygon
              fill={top}
              points={`${CX},${cy - H} ${CX + W},${cy} ${CX},${cy + H} ${CX - W},${cy}`}
            />
          </g>
        );
      })}
    </svg>
  );
}
