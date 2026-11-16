/**
 * Static isometric three-plate stack. Used as the fallback while the R3F
 * canvas loads, and as the only visual under 900px / reduced motion.
 *
 * With `labels`, each plate gets a short leader line and a mono label to its
 * right. Labels are HTML positioned over the SVG so they stay a crisp 12px
 * however the SVG scales.
 */
import { plateLabelColors } from "../../lib/plates";

const W = 100; // half width of a plate's top face
const H = 50; // half height of a plate's top face
const T = 12; // plate thickness
const CX = W + 6;
const VIEW_H = 262;
const VIEW_W_PLAIN = CX * 2;
const VIEW_W_LABELS = 460;
const LEADER_START = CX + W + 6;
const LEADER_END = LEADER_START + 24;
const LABEL_X = LEADER_END + 8;

// top → bottom, matching hero.plates in content.ts
const plates = [
  { cy: 56, top: "#FF6A2B", left: "#C94F1C", right: "#A33F15" },
  { cy: 104, top: "#1C1D1A", left: "#151613", right: "#0F100E" },
  { cy: 152, top: "#16171A", left: "#101113", right: "#0B0C0D" },
];

export default function StackSvg({
  labels,
  className = "",
}: {
  labels?: string[];
  className?: string;
}) {
  const viewW = labels ? VIEW_W_LABELS : VIEW_W_PLAIN;

  return (
    <div className={`relative ${className}`}>
      <svg viewBox={`0 0 ${viewW} ${VIEW_H}`} className="block h-auto w-full" aria-hidden="true">
        {[...plates].reverse().map(({ cy, top, left, right }) => (
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
        {labels &&
          plates.map(({ cy }, i) => (
            <line
              key={cy}
              x1={LEADER_START}
              x2={LEADER_END}
              y1={cy + T / 2}
              y2={cy + T / 2}
              stroke={plateLabelColors[i]}
              strokeWidth="1"
            />
          ))}
      </svg>

      {labels && (
        <ul>
          {plates.map(({ cy }, i) => (
            <li
              key={cy}
              className="absolute -translate-y-1/2 whitespace-nowrap font-mono text-[12px] leading-none"
              style={{
                left: `${(LABEL_X / viewW) * 100}%`,
                top: `${((cy + T / 2) / VIEW_H) * 100}%`,
                color: plateLabelColors[i],
              }}
            >
              {labels[i]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
