import { hero, stack } from "../../data/content";
import { plateLabelColors } from "../../lib/plates";
import LayerChips from "../ui/LayerChips";
import SectionHeading from "../ui/SectionHeading";
import { PlateSvg } from "../ui/StackSvg";

/* Steps 1–3b version: heading + three bordered rows of chips, no plates.

export default function StackSection() {
  return (
    <section id="stack" className="scroll-mt-14 px-4 py-10 md:px-6 min-[900px]:py-[60px]">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index={stack.index} label={stack.label} title={stack.title} />
        <div className="divide-y divide-line border-y border-line">
          {stack.layers.map((layer, i) => (
            <div key={layer.label} data-stack-layer className="grid gap-4 py-6 min-[900px]:grid-cols-[220px_1fr]">
              ...label, chips, sub-row...
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
*/

/**
 * Static 01 Stack: the stack in its exploded state, one plate per row with
 * that layer's chips beside it. Rendered under 900px and with reduced motion.
 * On desktop with motion the same content lives inside the pinned HeroStage.
 */
export default function StackSection() {
  return (
    <section id="stack" className="scroll-mt-14 px-4 py-10 md:px-6 min-[900px]:py-[60px]">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index={stack.index} label={stack.label} title={stack.title} />

        <ol className="space-y-8 min-[900px]:space-y-10">
          {stack.layers.map((layer, i) => (
            <li
              key={layer.label}
              data-stack-layer
              className="grid grid-cols-[104px_1fr] items-start gap-4 min-[900px]:grid-cols-[220px_1fr] min-[900px]:gap-10"
            >
              <PlateSvg index={i} className="mt-1" />
              <div>
                <p
                  className="mb-2 font-mono text-[12px]"
                  style={{ color: plateLabelColors[i] }}
                >
                  {hero.plates[i]}
                </p>
                <LayerChips layer={layer} index={i} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
