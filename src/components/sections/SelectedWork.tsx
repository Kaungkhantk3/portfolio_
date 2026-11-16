import { lazy, Suspense } from "react";
import { work } from "../../data/content";
import { useIdle } from "../../hooks/useIdle";
import { useMotionPrefs } from "../../hooks/useMotionPrefs";
import SectionHeading from "../ui/SectionHeading";
import WorkCard from "../work/WorkCard";

// The pinned deck (and Motion, which only it uses) is a separate chunk,
// requested on idle on desktop with motion allowed. Mobile and reduced motion
// never download it.
const WorkDeck = lazy(() => import("../work/WorkDeck"));

/** Plain vertical list: under 900px, short windows and reduced motion. */
function WorkList() {
  return (
    <section id="work" className="scroll-mt-14 px-4 py-10 md:px-6 min-[900px]:py-[60px]">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index={work.index} label={work.label} title={work.title} />
        <ol className="space-y-5">
          {work.projects.map((project, i) => (
            <li key={project.index}>
              <WorkCard project={project} featured={i === 0} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Same height as the pinned stage, so nothing moves when the deck mounts. */
function DeckPlaceholder() {
  return <section id="work" className="h-svh min-h-[600px]" aria-busy="true" />;
}

export default function SelectedWork() {
  const { fullMotion } = useMotionPrefs();
  const idle = useIdle(fullMotion);

  if (!fullMotion) return <WorkList />;
  if (!idle) return <DeckPlaceholder />;

  return (
    <Suspense fallback={<DeckPlaceholder />}>
      <WorkDeck />
    </Suspense>
  );
}
