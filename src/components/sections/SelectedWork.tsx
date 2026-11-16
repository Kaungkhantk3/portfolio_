import { work } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";
import WorkCard from "../work/WorkCard";

/**
 * Static path: plain vertical list. This is also what reduced-motion and
 * <900px keep; the pinned deck is layered on for desktop in step 5.
 */
export default function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-14 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index={work.index} label={work.label} title={work.title} />
        <ol className="space-y-5">
          {work.projects.map((project) => (
            <li key={project.index}>
              <WorkCard project={project} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
