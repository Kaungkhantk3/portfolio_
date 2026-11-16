/**
 * Static isometric three-plate stack. Used as the fallback while the R3F
 * canvas loads, and as the only visual under 900px / reduced motion.
 */
const CX = 160;
const W = 130; // half width of a plate's top face
const H = 65; // half height of a plate's top face
const T = 14; // plate thickness

const plates = [
  // drawn bottom → top
  { cy: 196, top: "#16171A", left: "#101113", right: "#0B0C0D" },
  { cy: 148, top: "#1C1D1A", left: "#151613", right: "#0F100E" },
  { cy: 100, top: "#FF6A2B", left: "#C94F1C", right: "#A33F15" },
];

export default function StackSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 300"
      className={className}
      role="img"
      aria-label="Three stacked plates: frontend, backend, data"
    >
      {plates.map(({ cy, top, left, right }) => (
        <g key={cy} stroke="#262723" strokeWidth="1" strokeLinejoin="round">
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
      ))}
    </svg>
  );
}
