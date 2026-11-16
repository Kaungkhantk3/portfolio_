import { work, type Project } from "../../data/content";
import Chip from "../ui/Chip";
import BuildLog from "./BuildLog";
import StatusBadge from "./StatusBadge";

export default function WorkCard({ project }: { project: Project }) {
  const { links } = project;

  return (
    <article className="rounded-xl border border-line bg-surface p-5 md:p-8">
      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="font-mono text-[12px] text-accent">{project.index}</span>
        <h3 className="font-display text-[22px] font-bold leading-tight text-ink md:text-[26px]">
          {project.title}
        </h3>
        {project.status && <StatusBadge status={project.status} />}
      </div>

      {project.context && (
        <p className="mb-3 font-mono text-[12px] text-muted">{project.context}</p>
      )}

      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mb-4 text-[15px] leading-[1.65] text-ink">{project.summary}</p>
          <ul className="space-y-2 text-[14px] leading-[1.6] text-muted">
            {project.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2.5">
                <span className="text-accent" aria-hidden="true">
                  •
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
        <BuildLog lines={project.buildLog} />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((chip) => (
            <li key={chip}>
              <Chip className="bg-bg">{chip}</Chip>
            </li>
          ))}
        </ul>
        {(links.live || links.source) && (
          <div className="flex gap-4 font-mono text-[12px] uppercase tracking-[0.08em]">
            {links.live && (
              <a
                href={links.live}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                {work.linkLabels.live} ↗
              </a>
            )}
            {links.source && (
              <a
                href={links.source}
                target="_blank"
                rel="noreferrer"
                className="text-ink hover:underline"
              >
                {work.linkLabels.source} ↗
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
