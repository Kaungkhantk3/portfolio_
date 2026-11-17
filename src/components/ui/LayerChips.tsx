import type { StackLayer } from "../../data/content";
import Chip from "./Chip";

/** "L1 Frontend" + its skill chips (and the optional sub-row, e.g. Tooling). */
export default function LayerChips({ layer, index }: { layer: StackLayer; index: number }) {
  return (
    <>
      <h3 className="flex items-baseline gap-3 font-display text-[18px] font-medium text-ink">
        <span className="font-mono text-[12px] text-accent">L{index + 1}</span>
        {layer.label}
      </h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {layer.chips.map((chip) => (
          <li key={chip}>
            <Chip>{chip}</Chip>
          </li>
        ))}
      </ul>
      {layer.sub && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <p className="mr-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
            {layer.sub.label}
          </p>
          {layer.sub.chips.map((chip) => (
            <Chip key={chip}>{chip}</Chip>
          ))}
        </div>
      )}
    </>
  );
}
