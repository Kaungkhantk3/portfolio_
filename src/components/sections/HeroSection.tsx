import { useRef } from "react";
import { hero } from "../../data/content";
import { gsap, SplitText, useGSAP } from "../../lib/gsap";
import { REDUCED_QUERY } from "../../hooks/useMotionPrefs";
import StatValue from "../ui/StatValue";
import StackStage from "./StackStage";

export default function HeroSection() {
  const root = useRef<HTMLElement>(null);

  // Headline intro: lines rise out of an overflow-hidden mask. Opacity stays
  // at 1 (the headline is the LCP element) and the whole thing is under 0.9s.
  // It starts on mount and does not wait for fonts or the 3D chunk; autoSplit
  // re-splits if the web font changes the line breaks.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`not ${REDUCED_QUERY}`, () => {
        const split = SplitText.create("[data-hero-headline]", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 105,
              duration: 0.7,
              stagger: 0.08,
              ease: "expo.out",
            }),
        });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="hero"
      data-stage-root
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
                <StatValue value={stat.value} decimals={stat.decimals} />
                {stat.suffix && <span className="text-accent">{stat.suffix}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <StackStage labels={hero.plates} />
    </section>
  );
}
