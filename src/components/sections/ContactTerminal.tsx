import { contact } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";

export default function ContactTerminal() {
  return (
    <section id="contact" className="scroll-mt-14 px-4 py-10 md:px-6 min-[900px]:py-[60px]">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index={contact.index} label={contact.label} title={contact.title}
          titleEnd={contact.titleEnd}
        />

        <div className="rounded-xl border border-line bg-surface p-5 md:p-8">
          <div className="mb-6 rounded-md border border-line bg-bg p-4 font-mono text-[13px] leading-[1.9]">
            <p data-curl className="break-all text-ink">
              {contact.command}
            </p>
            <p data-curl-response className="text-live">
              {contact.response}
            </p>
          </div>

          {/* Paragraph under the terminal, removed in step 3b:
          <p className="mb-7 max-w-[38rem] text-[15px] leading-[1.7] text-muted">
            {contact.paragraph}
          </p>
          */}

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
                    ? "rounded-full bg-accent px-6 py-3 text-[14px] font-semibold text-bg transition-opacity hover:opacity-90"
                    : "rounded-full border border-line px-6 py-3 text-[14px] font-medium text-ink transition-colors hover:border-muted"
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
