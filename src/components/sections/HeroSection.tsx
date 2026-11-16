import { hero } from "../../data/content";
import StackSvg from "../ui/StackSvg";

const formatStat = (value: number, decimals = 0) => value.toFixed(decimals);

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="mx-auto grid min-h-svh max-w-6xl items-center gap-10 px-4 pb-16 pt-24 md:px-6 min-[900px]:grid-cols-[1.15fr_0.85fr]"
    >
      <div>
        <p className="mb-6 inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-[12px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden="true" />
          {hero.status}
        </p>

        <h1 className="mb-6 font-display text-[clamp(2.1rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-ink">
          {hero.headline.map((line, i) => (
            <span
              key={line}
              data-hero-line
              className={`block ${i === hero.headline.length - 1 ? "text-muted" : ""}`}
            >
              {line}
            </span>
          ))}
        </h1>

        <p className="mb-9 max-w-[34rem] text-[16px] leading-[1.7] text-muted">
          {hero.paragraph}
        </p>

        <dl className="mb-10 grid max-w-[34rem] grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
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

        <div className="flex flex-wrap gap-3">
          <a
            href={hero.cta.primary.href}
            className="rounded-md bg-accent px-5 py-3 text-[14px] font-semibold text-bg transition-opacity hover:opacity-90"
          >
            {hero.cta.primary.label} →
          </a>
          <a
            href={hero.cta.secondary.href}
            className="rounded-md border border-line px-5 py-3 text-[14px] font-medium text-ink transition-colors hover:border-muted"
          >
            {hero.cta.secondary.label}
          </a>
        </div>
      </div>

      {/* Static stack. The lazy R3F canvas replaces this on desktop (step 3). */}
      <div className="mx-auto w-full max-w-[420px]">
        <StackSvg className="h-auto w-full" />
      </div>
    </section>
  );
}
