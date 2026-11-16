import type { ReactNode } from "react";

/** Text-only mono chip. */
export default function Chip({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[12px] leading-none text-muted ${className}`}
    >
      {children}
    </span>
  );
}
