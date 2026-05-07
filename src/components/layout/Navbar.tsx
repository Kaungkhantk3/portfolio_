import { useEffect, useRef, useState } from "react";
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
  const menuRef = useRef<HTMLDivElement>(null);

  /* ── Scroll: navbar glow + active section ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
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

  /* ── Close mobile menu on outside click ── */
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <div
          ref={menuRef}
          style={{
            background: "rgba(6,6,18,0.72)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: scrolled
              ? "1px solid rgba(129,140,248,0.28)"
              : "1px solid rgba(255,255,255,0.08)",
            boxShadow: scrolled ? "0 0 40px rgba(129,140,248,0.08)" : "none",
            borderRadius: open ? "20px" : "9999px",
            transition: "border-color .3s, box-shadow .3s, border-radius .3s",
          }}
          className="w-full max-w-[860px] px-5 py-2.5"
        >
          {/* ── Top bar ── */}
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <a
              href="#hero"
              onClick={closeMenu}
              className="font-display font-extrabold text-[15px] tracking-widest uppercase gradient-text flex-shrink-0"
            >
              KKK
            </a>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  style={{
                    background:
                      active === item.href.slice(1)
                        ? "rgba(255,255,255,0.10)"
                        : "transparent",
                    color:
                      active === item.href.slice(1)
                        ? "#ffffff"
                        : "rgba(255,255,255,0.60)",
                  }}
                  className="text-[13px] px-4 py-2 rounded-full transition-all duration-200 hover:text-white"
                  onMouseEnter={(e) => {
                    if (active !== item.href.slice(1))
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    if (active !== item.href.slice(1))
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop resume + mobile toggle */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href="/resume.pdf"
                download="Kaung_Khant_Kyaw_Resume.pdf"
                className="hidden md:inline-flex text-[13px] font-medium text-accent-bright px-4 py-2 rounded-full transition-all duration-200"
                style={{
                  border: "1px solid rgba(129,140,248,0.3)",
                  background: "rgba(129,140,248,0.08)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(129,140,248,0.18)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(129,140,248,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(129,140,248,0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(129,140,248,0.3)";
                }}
              >
                Resume ↗
              </a>

              {/* Hamburger button */}
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((p) => !p)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-white transition-all duration-200 flex-shrink-0"
                style={{
                  background: open
                    ? "rgba(129,140,248,0.2)"
                    : "rgba(255,255,255,0.06)",
                  border: open
                    ? "1px solid rgba(129,140,248,0.4)"
                    : "1px solid rgba(255,255,255,0.10)",
                }}
              >
                {open ? (
                  <X size={16} strokeWidth={2} />
                ) : (
                  <Menu size={16} strokeWidth={2} />
                )}
              </button>
            </div>
          </div>

          {/* ── Mobile dropdown menu ── */}
          {open && (
            <div
              className="md:hidden flex flex-col gap-1 pt-3 pb-2 mt-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="text-[14px] px-4 py-3 rounded-2xl transition-all duration-200"
                  style={{
                    color:
                      active === item.href.slice(1)
                        ? "#ffffff"
                        : "rgba(255,255,255,0.65)",
                    background:
                      active === item.href.slice(1)
                        ? "rgba(129,140,248,0.12)"
                        : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      active === item.href.slice(1)
                        ? "rgba(129,140,248,0.12)"
                        : "transparent";
                    (e.currentTarget as HTMLElement).style.color =
                      active === item.href.slice(1)
                        ? "#ffffff"
                        : "rgba(255,255,255,0.65)";
                  }}
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile resume link */}
              <a
                href="/resume.pdf"
                download="Kaung_Khant_Kyaw_Resume.pdf"
                onClick={closeMenu}
                className="text-[13px] font-medium text-accent-bright px-4 py-3 rounded-2xl mt-1 transition-all duration-200"
                style={{
                  border: "1px solid rgba(129,140,248,0.25)",
                  background: "rgba(129,140,248,0.08)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(129,140,248,0.18)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(129,140,248,0.08)";
                }}
              >
                Resume ↗
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Spacer */}
      <div className="h-24" />
    </>
  );
}
