import { contact } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";

export default function ContactTerminal() {
  return (
    <section id="contact" className="scroll-mt-14 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index={contact.index} label={contact.label} title={contact.title} />

        <div className="rounded-xl border border-line bg-surface p-5 md:p-8">
          <div className="mb-6 rounded-md border border-line bg-bg p-4 font-mono text-[13px] leading-[1.9]">
            <p data-curl className="break-all text-ink">
              {contact.curl}
            </p>
            <p data-curl-response className="text-live">
              {contact.response}
            </p>
          </div>

          <p className="mb-7 max-w-[38rem] text-[15px] leading-[1.7] text-muted">
            {contact.paragraph}
          </p>

          <div className="flex flex-wrap gap-3">
            {contact.links.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                {...("external" in link && link.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className={
                  i === 0
                    ? "rounded-md bg-accent px-5 py-3 text-[14px] font-semibold text-bg transition-opacity hover:opacity-90"
                    : "rounded-md border border-line px-5 py-3 text-[14px] font-medium text-ink transition-colors hover:border-muted"
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
