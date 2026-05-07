import type { Project } from "../../data/projects";

type Props = { project: Project };

export default function ProjectCard({ project }: Props) {
  return (
    <article className="group card-shimmer relative flex h-full flex-col overflow-hidden rounded-3xl glass transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(129,140,248,0.22)] hover:bg-[rgba(129,140,248,0.04)]">
      {/* ── Cover image banner ── */}
      {project.image ? (
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient fade into card body */}
          <div className="absolute inset-0 bg-linear-to-t from-[rgba(10,10,28,0.95)] via-[rgba(10,10,28,0.3)] to-transparent" />

          {/* Featured badge overlaid on image */}
          {project.featured && (
            <span className="absolute left-4 top-4 rounded-full border border-[rgba(129,140,248,0.35)] bg-[rgba(6,6,18,0.7)] px-3 py-1 text-[10px] font-medium text-accent-bright backdrop-blur-md">
              Featured
            </span>
          )}
        </div>
      ) : (
        /* Fallback placeholder if no image */
        <div className="relative flex h-44 w-full items-center justify-center overflow-hidden bg-[rgba(129,140,248,0.05)]">
          <div className="text-[11px] uppercase tracking-widest text-white/20">
            No Preview
          </div>
          {project.featured && (
            <span className="absolute left-4 top-4 rounded-full border border-[rgba(129,140,248,0.28)] bg-[rgba(129,140,248,0.12)] px-3 py-1 text-[10px] font-medium text-accent-bright">
              Featured
            </span>
          )}
        </div>
      )}

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3">
          <h3 className="font-display text-[18px] font-bold leading-snug text-white">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="mt-1 text-[12px] text-accent-bright">
              {project.subtitle}
            </p>
          )}
        </div>

        <p className="mb-4 text-[13px] leading-[1.75] text-white/55">
          {project.description}
        </p>

        <ul className="mb-5 flex flex-1 flex-col gap-2.5">
          {project.highlights.map((item) => (
            <li key={item} className="flex gap-2.5 text-[13px] text-white/55">
              <span className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_6px_rgba(129,140,248,0.5)]" />
              {item}
            </li>
          ))}
        </ul>

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
      </div>
    </article>
  );
}
