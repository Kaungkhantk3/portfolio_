import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

export default function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle
            eyebrow="About"
            title="A developer focused on clean product-minded engineering."
            description="I build modern web applications with a strong focus on UI quality, maintainable structure, and practical business features."
          />

          <div className="mt-8 space-y-5 text-slate-300">
            <p className="leading-7">
              My work focuses on building responsive interfaces, clean component
              systems, and full-stack applications that feel production-ready. I
              care about user experience, consistent design, and writing code
              that is easy to extend.
            </p>

            <p className="leading-7">
              I’ve worked on projects involving authentication, CRUD workflows,
              admin dashboards, relational databases, and interactive UI
              features. My goal is to contribute to real product teams as a
              frontend or full-stack developer.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
        >
          <h3 className="text-lg font-semibold text-white">Quick Snapshot</h3>

          <div className="mt-6 space-y-4 text-sm">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-slate-400">Role Target</p>
              <p className="mt-1 font-medium text-white">
                Frontend / Full-Stack Developer
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-slate-400">Core Strengths</p>
              <p className="mt-1 font-medium text-white">
                React, TypeScript, UI implementation, modern web apps
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-slate-400">Based In</p>
              <p className="mt-1 font-medium text-white">Thailand</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-slate-400">Looking For</p>
              <p className="mt-1 font-medium text-white">
                Real-world software engineering roles
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
