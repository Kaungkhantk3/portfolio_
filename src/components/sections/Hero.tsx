import { ArrowRight, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
            Frontend / Full-Stack Developer
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            Building clean, modern web experiences that feel professional.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            I’m Kaung Khant Kyaw, a developer focused on React, TypeScript,
            Node.js, and modern product-style interfaces. I build responsive,
            user-friendly applications with clean structure and production-ready
            thinking.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-sky-400"
            >
              View Projects
              <ArrowRight size={18} />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 font-medium text-white transition hover:border-slate-500 hover:bg-slate-900"
            >
              Contact Me
              <Mail size={18} />
            </a>

            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 font-medium text-white transition hover:border-slate-500 hover:bg-slate-900"
            >
              Resume
              <Download size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-2xl"
        >
          <div className="space-y-4">
            <div className="inline-flex rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">
              Based in Thailand
            </div>

            <h2 className="text-2xl font-semibold text-white">
              Ready for real software engineering roles
            </h2>

            <p className="text-slate-300 leading-7">
              Strong foundation in frontend development, modern UI building,
              APIs, authentication, relational databases, and product-focused
              development.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Core Stack</p>
                <p className="mt-2 font-medium text-white">
                  React, TypeScript, Node.js
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Focus</p>
                <p className="mt-2 font-medium text-white">
                  UI, Web Apps, Full-Stack
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
