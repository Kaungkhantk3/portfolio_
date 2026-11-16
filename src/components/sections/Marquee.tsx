import { marquee } from "../../data/content";

/** Static strip for now; becomes a Lenis-velocity loop in step 7. */
export default function Marquee() {
  return (
    <div
      data-marquee
      className="shrink-0 overflow-hidden border-y border-line py-5"
      aria-hidden="true"
    >
      {/* Step 2 styling (mono, uppercase, tracked, muted, "·" separators):
      <div className="flex w-max gap-8 whitespace-nowrap px-4 font-mono text-[13px] uppercase tracking-[0.12em] text-muted">
      */}
      <div className="flex w-max items-center gap-6 whitespace-nowrap px-4 font-display text-[24px] font-medium leading-none text-[#6F6D66] min-[900px]:gap-8 min-[900px]:text-[34px]">
        {marquee.map((item) => (
          <span key={item} className="flex items-center gap-6 min-[900px]:gap-8">
            {item}
            <span className="text-[0.6em] text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
