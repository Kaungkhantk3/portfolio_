import { stack } from "../../data/content";
import Chip from "../ui/Chip";
import SectionHeading from "../ui/SectionHeading";

export default function StackSection() {
  return (
    <section id="stack" className="scroll-mt-14 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index={stack.index} label={stack.label} title={stack.title} />

        <div className="divide-y divide-line border-y border-line">
          {stack.layers.map((layer, i) => (
            <div
              key={layer.label}
              data-stack-layer
              className="grid gap-4 py-6 min-[900px]:grid-cols-[220px_1fr]"
            >
              <h3 className="flex items-baseline gap-3 font-display text-[18px] font-medium text-ink">
                <span className="font-mono text-[12px] text-accent">L{i + 1}</span>
                {layer.label}
              </h3>
              <div className="space-y-4">
                <ul className="flex flex-wrap gap-2">
                  {layer.chips.map((chip) => (
                    <li key={chip}>
                      <Chip>{chip}</Chip>
                    </li>
                  ))}
                </ul>
                {layer.sub && (
                  <div>
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                      {layer.sub.label}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {layer.sub.chips.map((chip) => (
                        <li key={chip}>
                          <Chip>{chip}</Chip>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
