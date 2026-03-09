import { ArrowRight, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-6 pb-20 pt-16 sm:pb-24 sm:pt-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-sky-300 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Full-Stack Developer
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Building web applications with clean architecture and practical
            business features.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            I’m Kaung Khant Kyaw, a full-stack developer focused on building
            responsive web applications using React, TypeScript, Node.js,
            Express, MySQL, Prisma, and Docker. I enjoy developing products
            end-to-end, from frontend interfaces to backend APIs and database
            design.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              View Projects
              <ArrowRight size={18} />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10"
            >
              Contact Me
              <Mail size={18} />
            </a>

            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10"
            >
              Resume
              <Download size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="relative"
        >
          <div className="absolute -inset-2 rounded-[2rem] bg-sky-500/10 blur-2xl" />

          <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  Profile
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Ready to contribute across frontend and backend
                </h2>
              </div>

              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Available
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Current Focus
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Looking for full-stack developer roles where I can build
                complete application features, contribute to production systems,
                and grow through real engineering work.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
