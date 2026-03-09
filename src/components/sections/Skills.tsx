import { motion } from "framer-motion";
import { skills } from "../../data/skills";
import SectionTitle from "../ui/SectionTitle";

export default function Skills() {
  return (
    <section
      id="skills"
      className="border-y border-slate-800 bg-slate-900/50 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Skills"
          title="Technologies I use to build modern applications."
          description="A practical stack centered around frontend engineering, full-stack development, and product-focused implementation."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-200 transition hover:border-sky-400 hover:text-white"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
