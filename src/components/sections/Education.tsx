import { motion } from "framer-motion";

const activities = [
  {
    title: "Technical Support — International Student Orientation",
    date: "Jan 2025",
    description:
      "Troubleshot presentation and A/V systems to deliver seamless rehearsal and live orientation sessions.",
  },
  {
    title: "ARSA Volunteer Camp",
    date: "May 2024",
    description:
      "Organized educational activities and supported facility improvements during a 5-day community service camp.",
  },
];

const languages = [
  { name: "English", level: "Fluent" },
  { name: "Burmese", level: "Native" },
  { name: "Thai", level: "Learning" },
];

export default function Education() {
  return (
    <section id="education" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">Education</p>
          <h2 className="font-display mb-4 text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold tracking-tight leading-[1.15] text-white">
            Academic background and
            <br />
            activities.
          </h2>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Degree card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5 }}
            className="glass card-shimmer rounded-3xl p-6 lg:col-span-2"
          >
            <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
              <h3 className="font-display text-[18px] font-bold text-white">
                Bachelor of Engineering in Computer Engineering
              </h3>
              <span className="shrink-0 rounded-full border border-white/6 bg-white/4 px-3 py-1 text-[12px] text-white/40">
                Aug 2022 – Jun 2026
              </span>
            </div>
            <p className="mb-5 text-[13px] text-accent-bright">
              Mae Fah Luang University
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/7 bg-white/4 px-3 py-1 text-[11px] text-white/55">
                GPAX 3.86 / 4.00
              </span>
              <span className="rounded-full border border-white/7 bg-white/4 px-3 py-1 text-[11px] text-white/55">
                First Honours Degree
              </span>
              <span className="rounded-full border border-white/7 bg-white/4 px-3 py-1 text-[11px] text-white/55">
                Co-op: Full-Stack Developer Intern, MFessolutions Co., Ltd
              </span>
            </div>
          </motion.div>

          {/* Languages card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="glass card-shimmer rounded-3xl p-6"
          >
            <h3 className="font-display mb-5 text-[16px] font-bold text-white">
              Languages
            </h3>
            <div className="flex flex-col gap-3">
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center justify-between text-[13px]"
                >
                  <span className="text-white/70">{lang.name}</span>
                  <span className="rounded-full border border-white/6 bg-white/4 px-2.5 py-0.5 text-[11px] text-white/45">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activities cards */}
          {activities.map((activity, i) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
              className="glass card-shimmer rounded-3xl p-6 lg:col-span-3"
            >
              <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                <h3 className="font-display text-[15px] font-bold text-white">
                  {activity.title}
                </h3>
                <span className="shrink-0 rounded-full border border-white/6 bg-white/4 px-3 py-1 text-[12px] text-white/40">
                  {activity.date}
                </span>
              </div>
              <p className="text-[13px] leading-[1.75] text-white/55">
                {activity.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
