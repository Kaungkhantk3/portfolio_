import { motion } from "framer-motion";

const experiences = [
  {
    title: "Full-Stack Developer Intern",
    company: "Mfessoultions Co., Ltd",
    location: "Bangkok, Thailand",
    date: "Jan 2026 – Present",
    color: "#6366f1",
    glow: "rgba(99,102,241,0.6)",
    items: [
      "Developed 10+ responsive UI components using React and TypeScript.",
      "Built and maintained 15+ RESTful API endpoints using Node.js and Express.",
      "Implemented authentication and role-based access control using JWT.",
      "Resolved performance bottlenecks and bugs to improve application stability.",
      "Collaborated with team members through Git-based workflows in an agile environment.",
    ],
  },
  {
    title: "Teaching Assistant",
    company: "Mae Fah Luang University",
    location: "Chiang Rai, Thailand",
    date: "Aug 2023 – Apr 2025",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.6)",
    items: [
      "Assisted students in understanding programming fundamentals.",
      "Guided students in debugging and troubleshooting code issues during labs.",
      "Provided one-on-one support for students struggling with programming concepts.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">Experience</p>
          <h2 className="font-display mb-4 text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold tracking-tight leading-[1.15] text-white">
            Building in real development
            <br />
            environments.
          </h2>
          <p className="mb-12 max-w-[520px] text-[15px] leading-[1.75] text-white/55">
            Hands-on work across frontend, backend APIs, authentication,
            role-based access control, and database-driven systems.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-0">
          {/* Vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-[#6366f1] via-[rgba(99,102,241,0.4)] to-transparent" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-9 pb-8 last:pb-0"
            >
              {/* Timeline dot */}
              <span
                className="absolute left-[-5px] top-[6px] h-[11px] w-[11px] rounded-full border-2 border-[#060612]"
                style={{
                  background: exp.color,
                  boxShadow: `0 0 12px ${exp.glow}`,
                }}
              />

              {/* Card */}
              <div className="glass card-shimmer rounded-3xl p-6 transition-all duration-300 hover:border-[rgba(129,140,248,0.2)] hover:bg-white/[0.06]">
                <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-display text-[18px] font-bold text-white">
                    {exp.title}
                  </h3>
                  <span className="flex-shrink-0 rounded-full border border-white/6 bg-white/4 px-3 py-1 text-[12px] text-white/40">
                    {exp.date}
                  </span>
                </div>

                <p className="mb-5 text-[13px] text-accent-bright">
                  {exp.company} · {exp.location}
                </p>

                <ul className="flex flex-col gap-2.5">
                  {exp.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-[13px] text-white/55"
                    >
                      <span
                        className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
                        style={{ boxShadow: "0 0 5px rgba(129,140,248,0.4)" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
