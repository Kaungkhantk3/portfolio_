import { useRef } from "react";
import { experience } from "../../data/content";
import { FULL_MOTION_QUERY } from "../../hooks/useMotionPrefs";
import { gsap, ScrollTrigger, useGSAP } from "../../lib/gsap";
import Chip from "../ui/Chip";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

export default function Changelog() {
  const root = useRef<HTMLElement>(null);

  // Desktop: each row arrives like a log line as it enters the viewport (its
  // own trigger at "top 85%"). Within a row: date, then title, then the body.
  // Rows that enter together (a jump, a fast scroll) are staggered 0.12 apart.
  // Plays once. Small screens get a per-row fade-up from <Reveal>; reduced
  // motion gets the final state.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION_QUERY, () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-log-row]", root.current);
        const partsOf = (row: Element) =>
          ["[data-log-date]", "[data-log-title]", "[data-log-body]"]
            .map((sel) => row.querySelector(sel))
            .filter(Boolean);

        /* Step 7: one trigger for the whole section ("top 75%"), all rows on one
           timeline at i * 0.12. Rows below the fold had finished before they
           were seen. */
        gsap.set(rows.flatMap(partsOf), { y: 16, autoAlpha: 0 });
        ScrollTrigger.batch(rows, {
          start: "top 85%",
          once: true,
          onEnter: (batch) =>
            batch.forEach((row, i) =>
              gsap.to(partsOf(row), {
                y: 0,
                autoAlpha: 1,
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.08,
                delay: i * 0.12,
              }),
            ),
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="experience"
      className="scroll-mt-14 px-4 py-10 md:px-6 min-[900px]:py-[60px]"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index={experience.index}
          label={experience.label}
          title={experience.title}
        />

        <ol className="divide-y divide-line border-y border-line">
          {experience.entries.map((entry) => (
            <li key={entry.title} data-log-row>
              <Reveal className="grid gap-3 py-7 min-[900px]:grid-cols-[220px_1fr]">
                <p data-log-date className="font-mono text-[12px] leading-[1.8] text-muted">
                  <span className={entry.tag === "edu" ? "text-live" : "text-accent"}>
                    [{entry.tag}]
                  </span>{" "}
                  {entry.date}
                </p>

                <div>
                  <div data-log-title>
                    <h3 className="font-display text-[19px] font-bold leading-snug text-ink">
                      {entry.title}
                    </h3>
                    <p className="mt-1 text-[14px] text-muted">
                      {entry.org}
                      {entry.location && ` · ${entry.location}`}
                    </p>
                  </div>

                  <div data-log-body>
                    {entry.items.length > 0 && (
                      <ul className="mt-4 space-y-2 text-[14px] leading-[1.65] text-muted">
                        {entry.items.map((item) => (
                          <li key={item} className="flex gap-2.5">
                            <span className="font-mono text-accent" aria-hidden="true">
                              +
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {entry.chips && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {entry.chips.map((chip) => (
                          <li key={chip}>
                            <Chip>{chip}</Chip>
                          </li>
                        ))}
                      </ul>
                    )}

                    {entry.tag === "edu" && (
                      <p className="mt-4 font-mono text-[12px] leading-[1.8] text-muted">
                        <span className="uppercase tracking-[0.1em]">
                          {experience.languagesLabel}:
                        </span>{" "}
                        {experience.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
