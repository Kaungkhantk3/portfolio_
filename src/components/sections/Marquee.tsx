import { marquee } from "../../data/content";

/** Static strip for now; becomes a Lenis-velocity loop in step 7. */
export default function Marquee() {
  return (
    <div
      className="overflow-hidden border-y border-line py-4"
      aria-hidden="true"
    >
      <div className="flex w-max gap-8 whitespace-nowrap px-4 font-mono text-[13px] uppercase tracking-[0.12em] text-muted">
        {marquee.map((item) => (
          <span key={item} className="flex items-center gap-8">
            {item}
            <span className="text-accent">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
