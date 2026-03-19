import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

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
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section tracking
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 130)
          current = s.id;
      });
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <div
          className={[
            "w-full max-w-[860px] rounded-full px-5 py-2.5",
            "bg-[rgba(6,6,18,0.65)] backdrop-blur-2xl",
            "border transition-all duration-300",
            scrolled
              ? "border-[rgba(129,140,248,0.25)] shadow-[0_0_40px_rgba(129,140,248,0.08)]"
              : "border-[rgba(255,255,255,0.08)]",
          ].join(" ")}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <a
              href="#hero"
              className="font-display font-extrabold text-[15px] tracking-widest gradient-text uppercase"
            >
              KKK
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={[
                    "text-[13px] px-4 py-2 rounded-full transition-all duration-200",
                    active === item.href.slice(1)
                      ? "text-white bg-white/10"
                      : "text-white/60 hover:text-white hover:bg-white/8",
                  ].join(" ")}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Resume + mobile toggle */}
            <div className="flex items-center gap-2">
              <a
                href="/resume.pdf"
                download="Kaung_Khant_Kyaw_resume.pdf"
                className="hidden md:inline-flex text-[13px] font-medium text-accent-bright border border-[rgba(129,140,248,0.3)] bg-[rgba(129,140,248,0.08)] hover:bg-[rgba(129,140,248,0.18)] hover:border-[rgba(129,140,248,0.5)] px-4 py-2 rounded-full transition-all duration-200"
              >
                Resume ↗
              </a>

              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((p) => !p)}
                className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full glass text-white transition"
              >
                {open ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {open && (
            <div className="md:hidden border-t border-white/8 mt-2 pt-2 pb-1 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-[14px] text-white/70 hover:text-white hover:bg-white/8 px-4 py-3 rounded-2xl transition"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                onClick={() => setOpen(false)}
                className="text-[13px] font-medium text-accent-bright border border-[rgba(129,140,248,0.25)] bg-[rgba(129,140,248,0.08)] px-4 py-3 rounded-2xl mt-1 transition hover:bg-[rgba(129,140,248,0.18)]"
              >
                Resume ↗
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Spacer so content doesn't hide behind fixed nav */}
      <div className="h-24" />
    </>
  );
}
