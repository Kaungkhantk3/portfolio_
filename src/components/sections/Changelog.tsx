import { experience } from "../../data/content";
import Chip from "../ui/Chip";
import SectionHeading from "../ui/SectionHeading";

export default function Changelog() {
  return (
    <section id="experience" className="scroll-mt-14 px-4 py-10 md:px-6 min-[900px]:py-[60px]">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index={experience.index}
          label={experience.label}
          title={experience.title}
        />

        <ol className="divide-y divide-line border-y border-line">
          {experience.entries.map((entry) => (
            <li
              key={entry.title}
              data-log-row
              className="grid gap-3 py-7 min-[900px]:grid-cols-[220px_1fr]"
            >
              <p className="font-mono text-[12px] leading-[1.8] text-muted">
                <span className={entry.tag === "edu" ? "text-live" : "text-accent"}>
                  [{entry.tag}]
                </span>{" "}
                {entry.date}
              </p>

              <div>
                <h3 className="font-display text-[19px] font-bold leading-snug text-ink">
                  {entry.title}
                </h3>
                <p className="mt-1 text-[14px] text-muted">
                  {entry.org}
                  {entry.location && ` · ${entry.location}`}
                </p>

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
                    {experience.languages
                      .map((l) => `${l.name} (${l.level})`)
                      .join(" · ")}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
