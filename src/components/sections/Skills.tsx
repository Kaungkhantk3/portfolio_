import { motion } from "framer-motion";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiPrisma,
  SiDocker,
  SiGit,
  SiGithub,
  SiJsonwebtokens,
} from "react-icons/si";
import type { IconType } from "react-icons";

type Skill = { name: string; icon: IconType; color: string };

const groups: { label: string; skills: Skill[] }[] = [
  {
    label: "Frontend",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    label: "Backend & Database",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#888888" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "Prisma", icon: SiPrisma, color: "#5A67D8" },
      { name: "JWT", icon: SiJsonwebtokens, color: "#FB015B" },
    ],
  },
  {
    label: "Tooling & DevOps",
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#aaaaaa" },
    ],
  },
];

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
          <p className="mb-12 max-w-[520px] text-[15px] leading-[1.75] text-white/55">
            My stack covers frontend, backend APIs, databases, and modern
            development tooling — end to end.
          </p>
        </motion.div>

        {/* Skill groups */}
        <div className="space-y-10">
          {groups.map((group, gi) => (
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
                <div className="h-px flex-1 bg-[rgba(129,140,248,0.15)]" />
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
                      <Icon
                        style={{ color: skill.color, width: 16, height: 16 }}
                        className="transition-all duration-250 group-hover:scale-110"
                      />
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
