import { useState } from "react";
import { nav, site } from "../../data/content";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        <a
          href="#hero"
          onClick={close}
          className="font-mono text-[13px] font-medium tracking-[0.12em] text-ink"
        >
          {site.initials}
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
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
              onClick={close}
              className="py-3 font-mono text-[13px] uppercase tracking-[0.1em] text-muted"
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
