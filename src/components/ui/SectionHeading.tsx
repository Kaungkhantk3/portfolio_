/** "01 / Stack" mono eyebrow + display heading. */
export default function SectionHeading({
  index,
  label,
  title,
  titleEnd,
}: {
  index: string;
  label: string;
  title: string;
  /** Accent-coloured ending, e.g. a period. */
  titleEnd?: string;
}) {
  return (
    <header className="mb-10 md:mb-14">
      <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
        <span className="text-accent">{index}</span>
        <span className="mx-2 text-line">/</span>
        {label}
      </p>
      <h2 className="max-w-3xl font-display text-[clamp(1.75rem,4.2vw,3rem)] font-bold leading-[1.1] tracking-tight text-ink">
        {title}
        {titleEnd && <span className="text-accent">{titleEnd}</span>}
      </h2>
    </header>
  );
}
