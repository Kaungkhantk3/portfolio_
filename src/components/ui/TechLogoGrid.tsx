import { useEffect, useRef } from "react";
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiTypescript,
  SiFastapi,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiPrisma,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiJest,
  SiGithubactions,
} from "react-icons/si";
import { Cloud } from "lucide-react";
import type { ComponentType } from "react";

type GridIcon = ComponentType<{ size?: number; color?: string }>;

const stack: GridIcon[] = [
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiTypescript,
  SiFastapi,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiPrisma,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiJest,
  Cloud,
  SiGithubactions,
];

const ICON_SIZE = 30;

type ParticleState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export default function TechLogoGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iconRefs = useRef<Array<HTMLDivElement | null>>([]);
  const state = useRef<ParticleState[]>([]);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const { width, height } = container.getBoundingClientRect();

    state.current = stack.map(() => ({
      x: Math.random() * (width - ICON_SIZE),
      y: Math.random() * (height - ICON_SIZE),
      vx: (Math.random() - 0.5) * 0.6 + (Math.random() < 0.5 ? -0.15 : 0.15),
      vy: (Math.random() - 0.5) * 0.6 + (Math.random() < 0.5 ? -0.15 : 0.15),
    }));

    iconRefs.current.forEach((el, i) => {
      if (!el) return;
      const s = state.current[i];
      el.style.transform = `translate(${s.x}px, ${s.y}px)`;
    });

    if (reduceMotion) return;

    const step = () => {
      const { width: w, height: h } = container.getBoundingClientRect();

      state.current.forEach((s, i) => {
        s.x += s.vx;
        s.y += s.vy;

        if (s.x <= 0) {
          s.x = 0;
          s.vx *= -1;
        }
        if (s.x >= w - ICON_SIZE) {
          s.x = w - ICON_SIZE;
          s.vx *= -1;
        }
        if (s.y <= 0) {
          s.y = 0;
          s.vy *= -1;
        }
        if (s.y >= h - ICON_SIZE) {
          s.y = h - ICON_SIZE;
          s.vy *= -1;
        }

        const el = iconRefs.current[i];
        if (el) el.style.transform = `translate(${s.x}px, ${s.y}px)`;
      });

      rafId.current = requestAnimationFrame(step);
    };

    rafId.current = requestAnimationFrame(step);
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "320px",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {stack.map((Icon, i) => (
        <div
          key={i}
          ref={(el) => {
            iconRefs.current[i] = el;
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            willChange: "transform",
          }}
        >
          <Icon size={ICON_SIZE} color="rgba(255,255,255,0.55)" />
        </div>
      ))}

      <span
        style={{
          position: "absolute",
          bottom: "8px",
          right: "8px",
          fontSize: "12px",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        Core stack
      </span>
    </div>
  );
}
