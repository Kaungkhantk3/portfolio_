import type { Project } from "../../data/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-slate-800 bg-slate-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-700">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
          {project.subtitle ? (
            <p className="mt-1 text-sm text-sky-400">{project.subtitle}</p>
          ) : null}
        </div>

        {project.featured ? (
          <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300">
            Featured
          </span>
        ) : null}
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-300">
        {project.description}
      </p>

      <ul className="mt-5 space-y-2 text-sm text-slate-300">
        {project.highlights.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-sky-400"
          >
            Live Demo
          </a>
        ) : null}

        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:border-slate-500 hover:bg-slate-950"
          >
            GitHub
          </a>
        ) : null}
      </div>
    </article>
  );
}
