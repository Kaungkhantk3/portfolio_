import { ArrowRight, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { num: "15+", label: "API endpoints built" },
  { num: "10+", label: "UI components shipped" },
  { num: "3+", label: "Full-stack projects" },
  { num: "2y+", label: "Teaching assistant experience" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-96px)] flex items-center px-6 pb-20 pt-8 sm:pb-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* ── Left: headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Status badge */}
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-4 py-2">
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
            I'm Kaung Khant Kyaw — a full-stack developer building responsive
            web applications with React, TypeScript, Node.js, Express, MySQL,
            Prisma, and Docker. I ship products end-to-end.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-gradient-btn px-6 py-3 text-[14px] font-medium text-white shadow-[0_4px_24px_rgba(99,102,241,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(99,102,241,0.4)]"
            >
              View Projects <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-[14px] font-medium text-white transition-all duration-200 hover:bg-white/8 hover:border-white/15 hover:-translate-y-0.5"
            >
              Contact Me <Mail size={16} />
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-[14px] font-medium text-white transition-all duration-200 hover:bg-white/8 hover:border-white/15 hover:-translate-y-0.5"
            >
              Resume <Download size={16} />
            </a>
          </div>
        </motion.div>

        {/* ── Right: profile card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14 }}
          className="relative"
        >
          {/* Card glow */}
          <div className="pointer-events-none absolute -inset-3 rounded-[2.5rem] bg-[rgba(129,140,248,0.08)] blur-2xl" />

          {/* Glass card */}
          <div className="relative overflow-hidden rounded-[2rem] glass-heavy p-7">
            {/* Top gradient sheen */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(129,140,248,0.5)] to-transparent" />
            {/* Corner glow */}
            <div className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full bg-[rgba(129,140,248,0.18)] blur-3xl" />

            {/* Card header */}
            <div className="relative mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
                  Profile
                </p>
                <h2 className="font-display text-[19px] font-bold leading-snug text-white">
                  Ready to contribute across frontend &amp; backend
                </h2>
              </div>
              <div className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Open
              </div>
            </div>

            {/* Inset box */}
            <div className="relative glass-dark rounded-2xl p-4 mb-5">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.15em] text-white/30">
                Current Focus
              </p>
              <p className="text-[13px] leading-[1.75] text-white/60">
                Looking for full-stack developer roles where I can build
                complete application features, contribute to production systems,
                and grow through real engineering work.
              </p>
            </div>

            {/* Stats grid */}
            <div className="relative grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl bg-white/3 border border-white/6 px-4 py-3"
                >
                  <p className="font-display text-[22px] font-extrabold text-accent-bright leading-none">
                    {s.num}
                  </p>
                  <p className="mt-1.5 text-[11px] text-white/35 leading-tight">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
