import { hero } from "../../data/content";
import { plateLabelColors } from "../../lib/plates";
import StackSvg from "../ui/StackSvg";

const formatStat = (value: number, decimals = 0) => value.toFixed(decimals);

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-24 md:px-6 min-[900px]:min-h-svh min-[900px]:grid-cols-[1.1fr_0.9fr]"
    >
      <div>
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[12px] text-muted">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-live" aria-hidden="true" />
          {hero.status}
        </p>

        <h1
          data-hero-headline
          className="mb-6 font-display text-[clamp(2.1rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-ink"
        >
          {hero.headline}
          <span className="text-accent">{hero.headlineEnd}</span>
        </h1>

        <p className="mb-8 max-w-[540px] text-[16px] leading-[1.7] text-muted">
          {hero.paragraph}
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href={hero.cta.primary.href}
            className="rounded-full bg-accent px-6 py-3 text-[14px] font-semibold text-bg transition-opacity hover:opacity-90"
          >
            {hero.cta.primary.label} →
          </a>
          <a
            href={hero.cta.secondary.href}
            className="rounded-full border border-line px-6 py-3 text-[14px] font-medium text-ink transition-colors hover:border-muted"
          >
            {hero.cta.secondary.label}
          </a>
        </div>

        <hr className="my-9 max-w-[540px] border-0 border-t border-[#23241F]" />

        <dl className="grid max-w-[540px] grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
          {hero.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-1.5 font-mono text-[11px] uppercase leading-snug tracking-[0.08em] text-muted">
                {stat.label}
              </dt>
              <dd className="font-display text-[28px] font-bold leading-none text-ink tabular-nums">
                <span data-stat>{formatStat(stat.value, stat.decimals)}</span>
                {stat.suffix && <span className="text-accent">{stat.suffix}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Static stack. The lazy R3F canvas replaces the desktop one in step 3. */}
      <div role="img" aria-label={`Three stacked layers: ${hero.plates.join(", ")}`}>
        {/* ≥900px: labels to the right of each plate, with leader lines */}
        <StackSvg labels={hero.plates} className="hidden w-full min-[900px]:block" />

        {/* <900px: plain stack, labels as a stacked list underneath */}
        <div className="min-[900px]:hidden">
          <StackSvg className="mx-auto w-full max-w-[260px]" />
          <ul className="mt-6 space-y-2 font-mono text-[12px]">
            {hero.plates.map((label, i) => (
              <li key={label} className="flex items-center gap-3" style={{ color: plateLabelColors[i] }}>
                <span className="h-px w-6 bg-current" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
