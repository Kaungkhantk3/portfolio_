import { motion } from "framer-motion";
import { projects } from "../../data/projects";
import ProjectCard from "../ui/ProjectCard";

export default function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  const hero = featured[0];
  const secondary = featured.slice(1);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">Projects</p>
          <h2 className="font-display mb-4 text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold tracking-tight leading-[1.15] text-white">
            Work that reflects how I build
            <br />
            real applications.
          </h2>
          <p className="mb-12 max-w-[520px] text-[15px] leading-[1.75] text-white/55">
            Selected projects focused on product thinking, practical
            engineering, and clean implementation.
          </p>
        </motion.div>

        {/* ── Hero project ── */}
        {hero && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55 }}
            className="mb-5"
          >
            {/* Double-border glow wrapper */}
            <div className="rounded-[2rem] border border-[rgba(129,140,248,0.18)] bg-gradient-to-br from-[rgba(99,102,241,0.06)] to-transparent p-px">
              <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-[rgba(10,10,28,0.75)] p-8 backdrop-blur-2xl">
                {/* Top shimmer */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(129,140,248,0.45)] to-transparent" />
                {/* Corner glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[rgba(129,140,248,0.12)] blur-3xl" />

                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                  {/* Left */}
                  <div className="relative">
                    <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
                      ★ Main Project · Internship
                    </p>
                    <h3 className="font-display mb-2 text-[clamp(1.5rem,3vw,1.9rem)] font-extrabold tracking-tight text-white">
                      {hero.title}
                    </h3>
                    {hero.subtitle && (
                      <p className="mb-5 text-[13px] text-accent-bright">
                        {hero.subtitle}
                      </p>
                    )}
                    <p className="mb-6 text-[14px] leading-[1.75] text-white/55">
                      {hero.description}
                    </p>

                    <ul className="mb-6 flex flex-col gap-3">
                      {hero.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-[13px] text-white/60"
                        >
                          <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent shadow-[0_0_6px_rgba(129,140,248,0.5)]" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mb-7 flex flex-wrap gap-2">
                      {hero.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-white/7 bg-white/4 px-3 py-1 text-[11px] text-white/45"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {hero.live && (
                        <a
                          href={hero.live}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-white/15 bg-gradient-btn px-5 py-2.5 text-[13px] font-medium text-white shadow-[0_4px_20px_rgba(99,102,241,0.25)] transition-all hover:-translate-y-0.5"
                        >
                          Live Demo →
                        </a>
                      )}
                      {hero.github && (
                        <a
                          href={hero.github}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full glass px-5 py-2.5 text-[13px] font-medium text-white/70 transition-all hover:text-white hover:border-white/15"
                        >
                          GitHub →
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right: why it matters */}
                  <div className="flex items-start">
                    <div className="w-full rounded-2xl glass-dark p-6">
                      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-white/30">
                        Why it matters
                      </p>
                      <p className="mb-5 text-[13px] leading-[1.75] text-white/55">
                        Demonstrates full-stack ability across frontend UI,
                        backend APIs, database design, media handling, and
                        interactive export features.
                      </p>
                      <div className="flex flex-col gap-3">
                        {[
                          {
                            label: "Frontend",
                            value:
                              "Dynamic card editor, SVG/Canvas masking, text styling",
                          },
                          {
                            label: "Backend",
                            value:
                              "REST APIs, image handling, modular Express structure",
                          },
                          {
                            label: "Data",
                            value: "Prisma ORM with relational MySQL schema",
                          },
                        ].map((row) => (
                          <div
                            key={row.label}
                            className="rounded-xl border border-white/5 bg-white/3 px-4 py-3"
                          >
                            <p className="mb-1 text-[10px] uppercase tracking-wider text-white/30">
                              {row.label}
                            </p>
                            <p className="text-[13px] font-medium text-white/80">
                              {row.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Secondary featured ── */}
        {secondary.length > 0 && (
          <div className="mb-16 grid gap-4 lg:grid-cols-2">
            {secondary.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}

        {/* ── More work ── */}
        {others.length > 0 && (
          <div>
            {/* Divider label */}
            <div className="mb-6 flex items-center gap-4">
              <h3 className="font-display text-[18px] font-bold text-white">
                More Work
              </h3>
              <div className="h-px flex-1 bg-white/6" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {others.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
