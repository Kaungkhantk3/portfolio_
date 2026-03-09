import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <div
          className={[
            "w-full max-w-4xl rounded-2xl border transition-all duration-300",
            "bg-white/8 supports-[backdrop-filter]:bg-white/6",
            "backdrop-blur-md",
            scrolled
              ? "border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
              : "border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.18)]",
          ].join(" ")}
        >
          <div className="flex items-center justify-between px-5 py-3 md:px-6">
            <a
              href="#home"
              className="text-sm font-semibold tracking-[0.18em] text-white uppercase"
            >
              KKK
            </a>

            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="/resume.pdf"
              className="hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15 md:inline-flex"
            >
              Resume
            </a>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((prev) => !prev)}
              className="inline-flex rounded-full border border-white/10 bg-white/8 p-2 text-white transition hover:bg-white/12 md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {open ? (
            <div className="border-t border-white/10 px-3 pb-3 md:hidden">
              <nav className="mt-3 flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="/resume.pdf"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/12"
                >
                  Resume
                </a>
              </nav>
            </div>
          ) : null}
        </div>
      </header>

      <div className="h-24" />
    </>
  );
}
