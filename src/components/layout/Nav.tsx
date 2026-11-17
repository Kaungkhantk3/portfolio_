import { useEffect, useState } from "react";
import { nav, site } from "../../data/content";
import { currentSection, handleAnchorClick, scrollToHash } from "../../lib/anchors";
import { ScrollTrigger } from "../../lib/gsap";

/* Step 4: only "Stack" was handled here (goToStack). Moved to lib/anchors.ts in
   step 5; step 7 routes every in-page link through it and adds the highlight. */

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const close = () => setOpen(false);

  // Highlight the section the reader is in (including inside the pins).
  // State only changes when the section does: a handful of times per visit.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setActive(currentSection());
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    ScrollTrigger.addEventListener("refresh", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ScrollTrigger.removeEventListener("refresh", schedule);
    };
  }, []);

  // Arriving with a hash (/#work): go to the same place a click would, once
  // the pins have been set up.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = setTimeout(() => scrollToHash(hash, false), 900);
    return () => clearTimeout(id);
  }, []);

  const linkTone = (href: string) =>
    active === href.slice(1) ? "text-ink" : "text-muted hover:text-ink";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        <a
          href="#hero"
          onClick={(e) => {
            close();
            handleAnchorClick(e);
          }}
          className="font-mono text-[13px] font-medium tracking-[0.12em] text-ink"
        >
          {site.initials}
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const current = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={handleAnchorClick}
                aria-current={current ? "location" : undefined}
                className={`relative font-mono text-[12px] uppercase tracking-[0.1em] transition-colors ${linkTone(item.href)}`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ${current ? "scale-x-100" : "scale-x-0"}`}
                />
              </a>
            );
          })}
          <a
            href={site.resume.href}
            download={site.resume.download}
            className="rounded-full border border-line px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.1em] text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {site.resume.label} ↓
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((p) => !p)}
          className="rounded-md border border-line px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.1em] text-ink md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="flex flex-col border-t border-line px-4 py-2 md:hidden"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                close();
                handleAnchorClick(e);
              }}
              aria-current={active === item.href.slice(1) ? "location" : undefined}
              className={`py-3 font-mono text-[13px] uppercase tracking-[0.1em] ${active === item.href.slice(1) ? "text-ink" : "text-muted"}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.resume.href}
            download={site.resume.download}
            onClick={close}
            className="py-3 font-mono text-[13px] uppercase tracking-[0.1em] text-accent"
          >
            {site.resume.label} ↓
          </a>
        </nav>
      )}
    </header>
  );
}
