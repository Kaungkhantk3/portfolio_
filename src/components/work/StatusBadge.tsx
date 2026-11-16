import type { ProjectStatus } from "../../data/content";

const tone = {
  live: "text-live border-live/30",
  dev: "text-amber border-amber/30",
} as const;

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[11px] uppercase leading-none tracking-[0.08em] ${tone[status.kind]}`}
    >
      <span aria-hidden="true">●</span>
      {status.label}
    </span>
  );
}
