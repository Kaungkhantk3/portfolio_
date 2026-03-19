import type { Project } from "../../data/projects";

type Props = { project: Project };

export default function ProjectCard({ project }: Props) {
  return (
    <article className="group card-shimmer relative flex h-full flex-col overflow-hidden rounded-3xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(129,140,248,0.22)] hover:bg-[rgba(129,140,248,0.04)]">
      {/* Featured badge */}
      {project.featured && (
        <span className="absolute right-5 top-5 rounded-full border border-[rgba(129,140,248,0.28)] bg-[rgba(129,140,248,0.12)] px-3 py-1 text-[10px] font-medium text-accent-bright">
          Featured
        </span>
      )}

      {/* Title */}
      <div className="mb-3 pr-20">
        <h3 className="font-display text-[18px] font-bold text-white leading-snug">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="mt-1 text-[12px] text-accent-bright">
            {project.subtitle}
          </p>
        )}
      </div>

      {/* Description */}
      <p className="mb-4 text-[13px] leading-[1.75] text-white/55">
        {project.description}
      </p>

      {/* Highlights */}
      <ul className="mb-5 flex flex-1 flex-col gap-2.5">
        {project.highlights.map((item) => (
          <li key={item} className="flex gap-2.5 text-[13px] text-white/55">
            <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent shadow-[0_0_6px_rgba(129,140,248,0.5)]" />
            {item}
          </li>
        ))}
      </ul>

      {/* Stack */}
      <div className="mb-5 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-white/7 bg-white/4 px-3 py-1 text-[11px] text-white/45"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-2.5">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 bg-gradient-btn px-4 py-2 text-[12px] font-medium text-white shadow-[0_4px_16px_rgba(99,102,241,0.2)] transition-all hover:-translate-y-0.5"
          >
            Live Demo →
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full glass px-4 py-2 text-[12px] font-medium text-white/70 transition-all hover:text-white hover:border-white/15"
          >
            GitHub →
          </a>
        )}
      </div>
    </article>
  );
}
