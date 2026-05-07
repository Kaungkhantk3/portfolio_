import { ArrowRight, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Suspense, lazy } from "react";

// Lazy load so Three.js doesn't block initial paint
const GlobeCanvas = lazy(() => import("../ui/GlobeCanvas"));

const stats = [
  { num: "8+", label: "Projects shipped" },
  { num: "15+", label: "API endpoints built" },
  { num: "3.86", label: "GPA" },
  { num: "2y+", label: "Teaching experience" },
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
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-4 py-2">
            <span className="pulse-dot" />
            <span className="text-[12px] font-medium text-emerald-300">
              Full-Stack Developer · Available
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display mb-6 max-w-2xl text-[clamp(2.4rem,5vw,3.8rem)] font-extrabold leading-[1.08] tracking-tight text-white">
            Building web apps with{" "}
            <span className="gradient-text">clean architecture</span> and real
            impact.
          </h1>

          {/* Description */}
          <p className="mb-9 max-w-[480px] text-[16px] leading-[1.75] text-white/60">
            I'm Kaung Khant Kyaw — a full-stack developer based in Bangkok,
            building responsive web applications with React, TypeScript,
            Node.js, Express, MySQL, Prisma, and Docker. I ship products
            end-to-end.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[14px] font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                boxShadow: "0 4px 24px rgba(99,102,241,0.25)",
              }}
            >
              View Projects <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-[14px] font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
            >
              Contact Me <Mail size={16} />
            </a>
            <a
              href="/resume.pdf"
              download="Kaung_Khant_Kyaw_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-[14px] font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
            >
              Resume <Download size={16} />
            </a>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-3 max-w-[440px]">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-3 py-3 text-center"
              >
                <p className="font-display text-[20px] font-extrabold text-accent-bright leading-none">
                  {s.num}
                </p>
                <p className="mt-1.5 text-[10px] text-white/35 leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Right: globe ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative hidden lg:flex items-center justify-center"
        >
          {/* Outer glow ring */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Globe container */}
          <div
            className="relative w-full overflow-hidden rounded-[2rem] glass-heavy"
            style={{ aspectRatio: "1 / 1", maxWidth: "460px" }}
          >
            {/* Top shimmer */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[rgba(129,140,248,0.4)] to-transparent" />

            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-[12px] text-white/30 tracking-widest uppercase animate-pulse">
                    Loading globe…
                  </div>
                </div>
              }
            >
              <GlobeCanvas />
            </Suspense>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
