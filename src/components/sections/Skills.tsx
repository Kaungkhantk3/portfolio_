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
          title="Technologies I use to build complete web applications."
          description="My stack focuses on frontend development, backend APIs, database systems, and modern development tooling."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {skills.map((skill) => {
            const Icon = skill.icon;

            return (
              <div
                key={skill.name}
                className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 transition hover:border-sky-500 hover:bg-slate-900"
              >
                <Icon className="text-xl text-sky-400" />
                <span className="text-sm text-slate-200">{skill.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
