import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">Contact</p>
          <h2 className="font-display mb-12 text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold tracking-tight leading-[1.15] text-white">
            Open to full-stack developer
            <br />
            opportunities.
          </h2>
        </motion.div>

        {/* Contact card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="relative overflow-hidden rounded-[2rem] border border-[rgba(129,140,248,0.14)] bg-white/[0.03] p-10 backdrop-blur-[28px] sm:p-12"
        >
          {/* Corner glows */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[rgba(129,140,248,0.1)] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-60 w-60 rounded-full bg-[rgba(168,85,247,0.09)] blur-3xl" />
          {/* Top shimmer */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(129,140,248,0.4)] to-transparent" />

          <div className="relative">
            <p className="mb-8 max-w-[560px] text-[15px] leading-[1.75] text-white/55">
              The best way to reach me is by email or LinkedIn. I'm open to
              full-stack developer opportunities involving modern web
              applications, backend APIs, database-driven systems, and
              product-focused engineering work.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:kaungkhantluke.dev@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-gradient-btn px-6 py-3 text-[14px] font-medium text-white shadow-[0_4px_20px_rgba(99,102,241,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(99,102,241,0.4)]"
              >
                <Mail size={16} /> Email Me
              </a>
              <a
                href="https://github.com/Kaungkhantk3"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-[14px] font-medium text-white/70 transition-all hover:text-white hover:border-white/15 hover:-translate-y-0.5"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/kaung-khant-kyaw-66064627b/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-[14px] font-medium text-white/70 transition-all hover:text-white hover:border-white/15 hover:-translate-y-0.5"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>

            <p className="mt-10 text-[14px] italic text-white/25">
              — Let's build something together.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
