import { ArrowRight, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";
import TechLogoGrid from "../ui/TechLogoGrid";

// Earlier hero visuals preserved but unused — restore either by swapping the
// import/usage below back to one of these:
// import ArchitectureDiagram from "../ui/ArchitectureDiagram";
// const GlobeCanvas = lazy(() => import("../ui/GlobeCanvas"));

const stats = [
  { num: "4", label: "Apps Shipped" },
  { num: "15+", label: "REST APIs Built" },
  { num: "3.86", label: "GPAX (First Honours)" },
  { num: "60+", label: "Students Mentored" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-96px)] flex items-center px-6 pb-20 pt-8 sm:pb-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* ── Left: text ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Status badge */}
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-4 py-2">
            <span className="pulse-dot" />
            <span className="text-[12px] font-medium text-emerald-300">
              Full-Stack Developer · Open to Full-Time Roles
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display mb-6 max-w-2xl text-[clamp(2.4rem,5vw,3.8rem)] font-extrabold leading-[1.08] tracking-tight text-white">
            Building production system
            <br />
            <span
              style={{
                background:
                  "linear-gradient(90deg, #a78bfa 0%, #818cf8 50%, #7dd3fc 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              with clean, secure architecture.
            </span>
          </h1>

          {/* Description */}
          <p className="mb-9 max-w-120 text-[16px] leading-[1.75] text-white/60">
            I'm Kaung Khant Kyaw, a full-stack developer based in Bangkok. I
            turn requirements into production systems — 4 web apps and 15+ REST
            APIs shipped during a cooperative internship using React, Node.js,
            and MySQL, with secured JWT/RBAC authentication. Most recently, I
            built and deployed API Sentinel, a FastAPI/PostgreSQL monitoring
            platform running live on Railway.
          </p>

          {/* Stats strip */}
          <div className="mb-10 flex flex-wrap gap-x-8 gap-y-5">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-display text-[24px] font-extrabold leading-none"
                  style={{
                    background:
                      "linear-gradient(90deg, #a78bfa 0%, #818cf8 50%, #7dd3fc 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {stat.num}
                </p>
                <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[14px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                boxShadow: "0 4px 24px rgba(99,102,241,0.25)",
              }}
            >
              View Projects <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-transparent px-6 py-3 text-[14px] font-medium text-white/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
            >
              Contact Me <Mail size={16} />
            </a>
            <a
              href="/resume.pdf"
              download="Kaung_Khant_Kyaw_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-transparent px-6 py-3 text-[14px] font-medium text-white/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
            >
              Resume <Download size={16} />
            </a>
          </div>
        </motion.div>

        {/* ── Right: floating tech stack ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative flex w-full items-center justify-center"
        >
          {/* Outer glow ring */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Diagram container */}
          <div
            className="relative w-full max-w-80 overflow-hidden rounded-[2rem] glass-heavy sm:max-w-95 lg:max-w-115"
            style={{ aspectRatio: "1 / 1" }}
          >
            {/* Top shimmer */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-[rgba(129,140,248,0.4)] to-transparent" />

            <TechLogoGrid />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
