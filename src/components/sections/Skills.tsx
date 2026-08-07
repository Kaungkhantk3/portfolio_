import { motion } from "framer-motion";
import { skillGroups } from "../../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">Skills</p>
          <h2 className="font-display mb-4 text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold tracking-tight leading-[1.15] text-white">
            Technologies I use to build
            <br />
            complete web applications.
          </h2>
          <p className="mb-12 max-w-130 text-[15px] leading-[1.75] text-white/55">
            My stack covers frontend, backend APIs, databases, and modern
            development tooling — end to end.
          </p>
        </motion.div>

        {/* Skill groups */}
        <div className="space-y-10">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: gi * 0.08 }}
            >
              {/* Group label */}
              <div className="mb-4 flex items-center gap-3">
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent-bright">
                  {group.label}
                </span>
                <div className="h-px flex-1 bg-accent-dim" />
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, si) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: gi * 0.06 + si * 0.04,
                      }}
                      className="group flex cursor-default items-center gap-2.5 rounded-full glass px-4 py-2.5 text-[13px] text-white/60 transition-all duration-250 hover:-translate-y-0.5 hover:border-[rgba(129,140,248,0.35)] hover:bg-[rgba(129,140,248,0.1)] hover:text-accent-bright"
                    >
                      {Icon ? (
                        <Icon
                          style={{ color: skill.color, width: 16, height: 16 }}
                          className="transition-all duration-250 group-hover:scale-110"
                        />
                      ) : (
                        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-white/10 text-[9px] font-semibold uppercase text-white/40">
                          {skill.name.slice(0, 2)}
                        </span>
                      )}
                      {skill.name}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
