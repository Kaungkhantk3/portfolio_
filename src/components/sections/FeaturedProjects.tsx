import { motion } from "framer-motion";
import { projects } from "../../data/projects";
import ProjectCard from "../ui/ProjectCard";
import SectionTitle from "../ui/SectionTitle";

export default function FeaturedProjects() {
  const featuredProjects = projects.filter((project) => project.featured);
  const heroProject = featuredProjects[0];
  const secondaryProjects = featuredProjects.slice(1);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Projects"
          title="Work that reflects how I build real applications."
          description="Selected projects focused on product thinking, practical engineering, and clean implementation."
        />

        {heroProject ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            <div className="rounded-[28px] border border-sky-500/20 bg-gradient-to-br from-slate-900 to-slate-950 p-1">
              <div className="grid gap-8 rounded-[26px] bg-slate-950 p-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
                    Main Project
                  </p>

                  <h3 className="mt-3 text-3xl font-bold text-white">
                    {heroProject.title}
                  </h3>

                  {heroProject.subtitle ? (
                    <p className="mt-2 text-sm text-sky-300">
                      {heroProject.subtitle}
                    </p>
                  ) : null}

                  <p className="mt-5 text-base leading-8 text-slate-300">
                    {heroProject.description}
                  </p>

                  <ul className="mt-6 space-y-3 text-sm text-slate-300">
                    {heroProject.highlights.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {heroProject.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {heroProject.live ? (
                      <a
                        href={heroProject.live}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-sky-400"
                      >
                        Live Demo
                      </a>
                    ) : null}

                    {heroProject.github ? (
                      <a
                        href={heroProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:border-slate-500 hover:bg-slate-900"
                      >
                        GitHub
                      </a>
                    ) : null}
                  </div>
                </div>

                <div className="flex h-full items-center">
                  <div className="w-full rounded-3xl border border-slate-800 bg-slate-900 p-6">
                    <p className="text-sm text-slate-400">Why it matters</p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      This project shows full-stack ability across frontend UI,
                      backend APIs, database design, media handling, and
                      interactive export features.
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Frontend
                        </p>
                        <p className="mt-2 text-sm font-medium text-white">
                          Dynamic card editor, text styling, SVG/Canvas masking
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Backend
                        </p>
                        <p className="mt-2 text-sm font-medium text-white">
                          REST APIs, image handling, modular Express structure
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Data
                        </p>
                        <p className="mt-2 text-sm font-medium text-white">
                          Prisma ORM with relational MySQL schema
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}

        {secondaryProjects.length > 0 ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {secondaryProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        ) : null}

        {otherProjects.length > 0 ? (
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-white">Other Projects</h3>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
