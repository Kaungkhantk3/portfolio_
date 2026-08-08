import { Laptop2, Server, ShieldCheck, Database } from "lucide-react";
import type { ComponentType } from "react";

type Node = {
  key: string;
  label: string;
  sub: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  x: number; // viewBox % (0-100)
  y: number;
  w: number;
  h: number;
  /* Fraction of the 4s loop when the packet reaches this node */
  pulseDelay: number;
};

const NODES: Node[] = [
  {
    key: "client",
    label: "Client",
    sub: "React",
    icon: Laptop2,
    x: 2,
    y: 40,
    w: 15,
    h: 20,
    pulseDelay: 0,
  },
  {
    key: "api",
    label: "API",
    sub: "Node / Express",
    icon: Server,
    x: 29,
    y: 40,
    w: 15,
    h: 20,
    pulseDelay: 0.56,
  },
  {
    key: "auth",
    label: "Auth",
    sub: "JWT / RBAC",
    icon: ShieldCheck,
    x: 56,
    y: 40,
    w: 15,
    h: 20,
    pulseDelay: 1.13,
  },
  {
    key: "db",
    label: "Database",
    sub: "Postgres / MySQL",
    icon: Database,
    x: 83,
    y: 40,
    w: 15,
    h: 20,
    pulseDelay: 1.7,
  },
];

/* Forward through the 4 nodes, then a curved return path back to Client */
const FLOW_PATH = "M9.5,50 L36.5,50 L63.5,50 L90.5,50 C 96,82 4,82 9.5,50";

export default function ArchitectureDiagram() {
  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#7dd3fc" />
          </linearGradient>
          <filter id="dot-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connector path */}
        <path
          id="flow-path"
          d={FLOW_PATH}
          fill="none"
          stroke="url(#flow-gradient)"
          strokeOpacity={0.35}
          strokeWidth={0.6}
          strokeLinecap="round"
        />

        {/* Traveling packet dot */}
        <circle r="1.6" fill="#a5b4fc" filter="url(#dot-glow)">
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
            <mpath href="#flow-path" />
          </animateMotion>
        </circle>

        {/* Node cards rendered as HTML via foreignObject */}
        {NODES.map((node) => {
          const Icon = node.icon;
          return (
            <foreignObject
              key={node.key}
              x={node.x}
              y={node.y}
              width={node.w}
              height={node.h}
            >
              <div
                className="node-pulse flex h-full w-full flex-col items-center justify-center gap-1 rounded-xl px-1 text-center"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  animationDelay: `${node.pulseDelay}s`,
                }}
              >
                <Icon size={14} className="text-accent-bright" />
                <p
                  className="font-display font-bold leading-none text-white"
                  style={{ fontSize: "4.2px" }}
                >
                  {node.label}
                </p>
                <p
                  className="leading-none text-white/40"
                  style={{ fontSize: "3px" }}
                >
                  {node.sub}
                </p>
              </div>
            </foreignObject>
          );
        })}
      </svg>

      {/* Caption */}
      <p
        className="absolute bottom-3 right-4 text-[11px] pointer-events-none select-none"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        Client → API → Auth → DB
      </p>
    </div>
  );
}
