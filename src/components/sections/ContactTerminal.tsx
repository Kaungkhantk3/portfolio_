import { useRef } from "react";
import { contact } from "../../data/content";
import { FULL_MOTION_QUERY } from "../../hooks/useMotionPrefs";
import { gsap, useGSAP } from "../../lib/gsap";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const CHARS_PER_SECOND = 35;

export default function ContactTerminal() {
  const root = useRef<HTMLElement>(null);

  // Desktop: when the terminal enters the viewport, the command types out,
  // then the response fades in. Once. The typed text is visual only
  // (aria-hidden); screen readers have the whole thing from the start.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION_QUERY, () => {
        const q = gsap.utils.selector(root);
        const typed = q("[data-typed]")[0] as HTMLElement;
        const rest = q("[data-rest]")[0] as HTMLElement;
        const cursor = q("[data-cursor]")[0] as HTMLElement;
        const response = q("[data-response]")[0] as HTMLElement;
        const full = contact.command;
        const state = { chars: 0 };

        // The untyped remainder stays in the layout (invisible), so the line
        // wraps the same way throughout and nothing below it moves.
        const render = () => {
          const n = Math.round(state.chars);
          typed.textContent = full.slice(0, n);
          rest.textContent = full.slice(n);
        };
        render();
        gsap.set(cursor, { display: "inline" });
        gsap.set(response, { autoAlpha: 0 });

        gsap
          .timeline({
            scrollTrigger: { trigger: q("[data-terminal]")[0], start: "top 80%", once: true },
          })
          .to(state, {
            chars: full.length,
            duration: full.length / CHARS_PER_SECOND,
            ease: "none",
            onUpdate: render,
          })
          .to(response, { autoAlpha: 1, duration: 0.4 }, "+=0.15");

        return () => {
          typed.textContent = full;
          rest.textContent = "";
          gsap.set([cursor, response], { clearProps: "all" });
        };
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="contact"
      className="scroll-mt-14 px-4 py-10 md:px-6 min-[900px]:py-[60px]"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index={contact.index}
          label={contact.label}
          title={contact.title}
          titleEnd={contact.titleEnd}
        />

        <Reveal className="rounded-xl border border-line bg-surface p-5 md:p-8">
          <div
            data-terminal
            className="mb-6 rounded-md border border-line bg-bg p-4 font-mono text-[13px] leading-[1.9]"
          >
            <p className="sr-only">
              {contact.command} {contact.response}
            </p>
            <p className="break-all text-ink" aria-hidden="true">
              <span data-typed>{contact.command}</span>
              <span data-cursor className="cursor-blink hidden text-accent">
                ▍
              </span>
              <span data-rest className="invisible" />
            </p>
            <p data-response className="text-live" aria-hidden="true">
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
        </Reveal>
      </div>
    </section>
  );
}
