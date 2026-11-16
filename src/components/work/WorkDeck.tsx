import { useRef, type PointerEvent, type ReactNode } from "react";
import * as m from "motion/react-m";
import { domAnimation, LazyMotion, useMotionValue, useSpring } from "motion/react";
import { work, type Project } from "../../data/content";
import { FULL_MOTION_QUERY } from "../../hooks/useMotionPrefs";
import { scrollToWorkLabel } from "../../lib/anchors";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../lib/gsap";
import Chip from "../ui/Chip";
import StatusBadge from "./StatusBadge";

const projects = work.projects;
const TOTAL = projects.length;

/* ── Timeline map (timeline seconds; the pin scrubs through all of it) ──── */
const ENTER = 0.5; // heading words, deck tilt, index slide-in
const STEP = 1; // one card → the next
const GRID_AT = ENTER + (TOTAL - 1) * STEP; // card 06 is active here
const GRID = 1; // deck → overview grid
const END_HOLD = 0.15;
const cardLabel = (i: number) => `card-${i + 1}`;

// Deck slots: the active card, then the two visible behind it, then hidden.
const SLOTS = [
  { y: 0, scale: 1, autoAlpha: 1 },
  { y: -18, scale: 0.94, autoAlpha: 1 },
  { y: -36, scale: 0.88, autoAlpha: 1 },
  { y: -54, scale: 0.82, autoAlpha: 0 },
];
const slot = (n: number) => SLOTS[Math.min(n, SLOTS.length - 1)];
const PERSPECTIVE = 1200;
const ACCENT = "#FF6A2B";
const LINE = "#262723";

/* ── Card shell: the one element Motion owns ─────────────────────────────
   GSAP owns the <article> (position, size, deck transforms, border). Motion
   owns this inner wrapper only: pointer tilt on the active deck card, magnetic
   lift on grid tiles. They never touch the same element's transform. */
function CardShell({ children }: { children: ReactNode }) {
  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 20 });

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    x.set(0);
    y.set(0);
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const el = e.currentTarget;
    const card = el.closest<HTMLElement>("[data-card]");
    const mode = el.closest<HTMLElement>("[data-work-root]")?.dataset.mode;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;

    if (mode === "grid") {
      // Magnetic: lean toward the cursor and lift.
      x.set(px * 12);
      y.set(py * 12 - 5);
      rotateX.set(0);
      rotateY.set(0);
    } else if (card?.dataset.active === "true") {
      // ±6° tilt toward the pointer.
      rotateY.set(px * 12);
      rotateX.set(-py * 12);
      x.set(0);
      y.set(0);
    } else reset();
  };

  return (
    <m.div
      data-shell
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, x, y, transformPerspective: 900 }}
      className="h-full w-full overflow-hidden rounded-[11px] border border-transparent bg-surface transition-[border-color,box-shadow] duration-200 group-data-[mode=grid]/work:hover:border-accent group-data-[mode=grid]/work:hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
    >
      {children}
    </m.div>
  );
}

function CardLinks({ project }: { project: Project }) {
  const { links } = project;
  if (!links.live && !links.source) return null;
  return (
    <div className="flex shrink-0 gap-4 font-mono text-[12px] uppercase tracking-[0.08em]">
      {links.live && (
        <a href={links.live} target="_blank" rel="noreferrer" className="text-accent hover:underline">
          {work.linkLabels.live} ↗
        </a>
      )}
      {links.source && (
        <a href={links.source} target="_blank" rel="noreferrer" className="text-ink hover:underline">
          {work.linkLabels.source} ↗
        </a>
      )}
    </div>
  );
}

function DeckCard({ project, i }: { project: Project; i: number }) {
  return (
    <article
      data-card
      aria-label={project.title}
      // Height comes from a class, not an inline style: the timeline clears
      // inline width/height on refresh and must not remove this.
      className="h-[var(--card-h,auto)] rounded-xl border border-line will-change-transform [grid-area:1/1]"
      style={{ zIndex: TOTAL - i, transformOrigin: "50% 0%" }}
    >
      <CardShell>
        {/* Full face: the deck card. Fixed to the deck width so nothing
            re-wraps while the card resizes into its grid tile. */}
        <div data-face="full" className="h-full" style={{ width: "var(--deck-w, 100%)" }}>
          <div
            data-face-content
            className="flex h-full flex-col p-7 group-data-[fit=compact]/work:p-5 group-data-[fit=tight]/work:p-5"
          >
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="font-mono text-[12px] text-accent">{project.index}</span>
              <h3 className="font-display text-[24px] font-bold leading-tight text-ink group-data-[fit=compact]/work:text-[21px] group-data-[fit=tight]/work:text-[21px]">
                {project.title}
              </h3>
              {project.status && <StatusBadge status={project.status} />}
              {/* Step 5 had the links here, top right. Step 5b: bottom row. */}
            </div>

            {project.context && (
              <p className="mb-3 font-mono text-[12px] text-muted">{project.context}</p>
            )}

            <div className="grid grid-cols-[1.2fr_1fr] gap-6">
              <div>
                <p className="mb-3 text-[15px] leading-[1.6] text-ink group-data-[fit=compact]/work:text-[14px] group-data-[fit=tight]/work:text-[14px]">
                  {project.summary}
                </p>
                <ul className="space-y-1.5 text-[13.5px] leading-[1.55] text-muted group-data-[fit=compact]/work:text-[13px] group-data-[fit=tight]/work:text-[13px]">
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

              <pre className="self-start overflow-hidden rounded-md border border-line bg-bg p-4 font-mono text-[12px] leading-[1.9] text-muted group-data-[fit=compact]/work:p-3 group-data-[fit=tight]/work:p-3">
                {project.buildLog.map((line, k) => (
                  <span key={line} data-log-line className="block w-fit">
                    {line.startsWith("$") ? <span className="text-ink">{line}</span> : line}
                    {k === project.buildLog.length - 1 && (
                      <span data-cursor className="cursor-blink ml-1 text-accent" aria-hidden="true">
                        ▍
                      </span>
                    )}
                  </span>
                ))}
              </pre>
            </div>

            {/* Chips + links: pinned to the bottom of the (equal-height) card. */}
            <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pt-5 group-data-[fit=compact]/work:pt-4 group-data-[fit=tight]/work:pt-4">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((chip) => (
                  <li key={chip} data-chip>
                    <Chip className="bg-bg">{chip}</Chip>
                  </li>
                ))}
              </ul>
              <CardLinks project={project} />
            </div>
          </div>
        </div>

        {/* Tile face: the overview-grid version of the same project. */}
        <div
          data-face="tile"
          className="invisible absolute left-0 top-0 flex flex-col p-5"
          style={{ width: "var(--tile-w, 100%)", height: "var(--tile-h, 100%)" }}
        >
          <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-mono text-[12px] text-accent">{project.index}</span>
            <h3 className="font-display text-[18px] font-bold leading-tight text-ink">
              {project.title}
            </h3>
            {project.status && <StatusBadge status={project.status} />}
          </div>
          <p className="line-clamp-2 text-[13px] leading-[1.55] text-muted">{project.summary}</p>
          <div className="mt-auto flex items-end justify-between gap-4 pt-3">
            <ul className="flex max-h-[26px] flex-wrap gap-1.5 overflow-hidden">
              {project.stack.map((chip) => (
                <li key={chip}>
                  <Chip className="bg-bg">{chip}</Chip>
                </li>
              ))}
            </ul>
            <CardLinks project={project} />
          </div>
        </div>
      </CardShell>
    </article>
  );
}

export default function WorkDeck() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const stage = root.current;
      if (!stage) return;

      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION_QUERY, () => {
        const q = gsap.utils.selector(stage);
        const one = (sel: string) => q(sel)[0] as HTMLElement;
        const cards = q("[data-card]") as HTMLElement[];
        const fullFaces = q('[data-face="full"]') as HTMLElement[];
        const tileFaces = q('[data-face="tile"]') as HTMLElement[];
        const contents = q("[data-face-content]") as HTMLElement[];
        const slots = q("[data-slot]") as HTMLElement[];
        const indexLinks = q("[data-index-link]") as HTMLElement[];
        const body = one("[data-work-body]");
        const deck = one("[data-deck]");
        const aside = one("[data-work-index]");
        const bar = one("[data-index-bar]");
        const odometer = one("[data-odometer]");
        const live = one("[data-work-live]");
        const title = one("[data-work-title]");

        /* ── Measuring. Layout numbers only (offset*), so the result is the
           same whatever the scroll position is when a refresh happens. ── */
        let layout = { deckW: 0, cardH: 0, tileW: 0, tileH: 0, slots: [] as { x: number; y: number }[] };

        const measure = () => {
          // Cards may still carry sizes from the grid state.
          gsap.set(cards, { clearProps: "width,height" });

          // Fit: never cut card content. Tighten padding/type first, then drop
          // the section heading row, until the tallest card fits.
          let cardH = 0;
          let deckW = 0;
          // Content stretches to the card (links row sits at the bottom), so
          // measure with the card height released: every card then takes the
          // height of the tallest one's content.
          stage.style.setProperty("--card-h", "auto");
          for (const fit of ["normal", "compact", "tight"]) {
            stage.dataset.fit = fit;
            deckW = deck.offsetWidth;
            stage.style.setProperty("--deck-w", `${deckW}px`);
            cardH = Math.max(
              ...cards.map((c) => (c.querySelector("[data-face-content]") as HTMLElement).offsetHeight),
            ) + 2; // + the article's border
            if (cardH <= body.offsetHeight - deck.offsetTop - 8) break;
          }
          stage.style.setProperty("--card-h", `${cardH}px`);

          const first = slots[0];
          stage.style.setProperty("--tile-w", `${first.offsetWidth - 2}px`);
          stage.style.setProperty("--tile-h", `${first.offsetHeight - 2}px`);

          layout = {
            deckW,
            cardH,
            tileW: first.offsetWidth,
            tileH: first.offsetHeight,
            // Slot position relative to a card's resting position in the deck.
            slots: slots.map((s) => ({
              x: s.offsetLeft - deck.offsetLeft,
              y: s.offsetTop - deck.offsetTop,
            })),
          };
        };
        measure();
        ScrollTrigger.addEventListener("refreshInit", measure);

        /* ── Activation: everything that is not scrubbed. Driven from the
           timeline's time, so it is right however fast the user scrolls and
           in both directions. ── */
        let active = -2;
        let mode: "deck" | "grid" = "deck";
        let typing: gsap.core.Timeline | null = null;
        let chipsIn: gsap.core.Tween | null = null;

        const logParts = (card: HTMLElement) => ({
          lines: card.querySelectorAll<HTMLElement>("[data-log-line]"),
          cursor: card.querySelector<HTMLElement>("[data-cursor]"),
          chips: card.querySelectorAll<HTMLElement>("[data-chip]"),
        });

        // A card that is not being typed always shows its whole log.
        const showComplete = (card: HTMLElement) => {
          const { lines, cursor, chips } = logParts(card);
          gsap.set(lines, { autoAlpha: 1, clipPath: "none" });
          gsap.set(chips, { autoAlpha: 1, y: 0 });
          if (cursor) gsap.set(cursor, { autoAlpha: 1 });
        };

        // Not wrapped in the hook's contextSafe(): calling the outer context's
        // wrapper from inside this matchMedia context makes the two contexts
        // contain each other, and reverting then recurses forever. These two
        // animations are tracked in `typing` / `chipsIn` and killed by hand.
        const play = (card: HTMLElement) => {
          const { lines, cursor, chips } = logParts(card);
          typing = gsap.timeline();
          typing.set(lines, { autoAlpha: 0 });
          if (cursor) typing.set(cursor, { autoAlpha: 0 }, 0);
          lines.forEach((line, k) => {
            // One line every 0.15s, each typed left to right.
            typing!
              .set(line, { autoAlpha: 1 }, k * 0.15)
              .fromTo(
                line,
                { clipPath: "inset(0 100% 0 0)" },
                { clipPath: "inset(0 0% 0 0)", duration: 0.14, ease: "steps(14)" },
                k * 0.15,
              );
          });
          if (cursor) typing.set(cursor, { autoAlpha: 1 }, lines.length * 0.15);
          chipsIn = gsap.fromTo(
            chips,
            { y: -12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.3, stagger: 0.05, ease: "power2.out" },
          );
        };

        const sync = (nextActive: number, nextMode: "deck" | "grid") => {
          if (nextActive === active && nextMode === mode) return;
          const changedCard = nextActive !== active;
          active = nextActive;
          mode = nextMode;
          stage.dataset.mode = mode;

          cards.forEach((card, i) => {
            const isActive = mode === "deck" && i === active;
            card.dataset.active = String(isActive);
            // Deck: only the active card is reachable. Grid: every tile is.
            const reachable = mode === "grid" || isActive;
            card.inert = !reachable;
            if (reachable) card.removeAttribute("aria-hidden");
            else card.setAttribute("aria-hidden", "true");
            // Within a card, only the face on show is reachable.
            fullFaces[i].inert = mode === "grid";
            tileFaces[i].inert = mode === "deck";
          });

          indexLinks.forEach((link, i) => {
            if (i === active) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
          aside.inert = mode === "grid";

          const shown = Math.max(active, 0);
          live.textContent =
            mode === "grid" ? work.overviewLabel : work.counterLabel(shown + 1, TOTAL);

          if (changedCard) {
            // Whatever was typing is finished instantly: never left half-typed.
            typing?.kill();
            chipsIn?.kill();
            typing = chipsIn = null;
            cards.forEach(showComplete);
            if (active >= 0) play(cards[active]);
          }
        };

        const syncFromTime = (t: number) => {
          if (t > GRID_AT + GRID / 2) sync(-1, "grid");
          else if (t < ENTER / 2) sync(-1, "deck");
          else sync(gsap.utils.clamp(0, TOTAL - 1, Math.round((t - ENTER) / STEP)), "deck");
        };

        /* ── Initial deck state ── */
        cards.forEach((card, i) => {
          gsap.set(card, { ...slot(i), transformPerspective: PERSPECTIVE, borderColor: i === 0 ? ACCENT : LINE });
          showComplete(card);
        });
        gsap.set(tileFaces, { autoAlpha: 0 });
        // Cards waiting behind the active one show surface + border only.
        gsap.set(contents.slice(1), { autoAlpha: 0 });
        // Perspective and pivot are fixed, not tweened: animating the perspective
        // along with the angle cancels the tilt out visually.
        gsap.set(deck, { transformPerspective: PERSPECTIVE, transformOrigin: "50% 100%" });

        const split = SplitText.create(title, { type: "words", mask: "words" });

        /* ── Master timeline: one ScrollTrigger, a label per card ── */
        const tl = gsap.timeline({
          // Gentle ease: the scrub and the snap already smooth the motion. A
          // strong ease here squeezes each card change into a fraction of the
          // scroll and makes it look abrupt.
          defaults: { ease: "sine.inOut" },
          onUpdate: () => syncFromTime(tl.time()),
          scrollTrigger: {
            id: "work",
            trigger: stage,
            start: "top top",
            end: () => `+=${window.innerHeight * 0.8 * TOTAL}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            snap: {
              snapTo: "labelsDirectional",
              duration: { min: 0.3, max: 0.6 },
              ease: "power2.inOut",
              delay: 0.08,
            },
          },
        });

        // Enter
        // (Step 5 revealed the heading words here, at the start of the pin, which
        // left an empty band while the section scrolled in. They now have their
        // own trigger below.)
        tl.addLabel("start", 0)
          // The deck stays opaque while tilted: the section scrolls into view
          // before the pin starts, and must not arrive as an empty screen.
          .from(deck, { rotateX: 28, duration: ENTER }, 0)
          .from(aside, { x: -40, autoAlpha: 0, duration: ENTER - 0.1 }, 0.1)
          .addLabel(cardLabel(0), ENTER);

        // Card k−1 → card k, in sequence so the two never read through each
        // other: the outgoing card leaves in the first half of the step and is
        // fully transparent by 0.45; the incoming card settles in the second
        // half and its content only fades in from 0.5. (Step 5 ran both across
        // the whole step, so at the midpoint both were half visible.)
        // Lower cards have the higher z-index, so the outgoing card stays in
        // front until it is gone.
        for (let k = 1; k < TOTAL; k++) {
          const t0 = ENTER + (k - 1) * STEP;
          const at = (f: number) => t0 + f * STEP;
          tl.to(cards[k - 1], { yPercent: -110, rotateX: -38, duration: 0.5 * STEP, ease: "sine.in" }, at(0))
            .to(cards[k - 1], { autoAlpha: 0, duration: 0.4 * STEP, ease: "none" }, at(0.05))
            .to(cards[k], { ...slot(0), borderColor: ACCENT, duration: 0.6 * STEP, ease: "sine.out" }, at(0.4))
            .to(contents[k], { autoAlpha: 1, duration: 0.4 * STEP, ease: "none" }, at(0.5))
            .to(bar, { yPercent: 100 * k, duration: 0.6 * STEP }, at(0.2))
            .to(odometer, { yPercent: (-100 / TOTAL) * k, duration: 0.6 * STEP }, at(0.2));
          // The cards behind move up one slot.
          for (let n = 1; k + n < TOTAL && n < SLOTS.length; n++) {
            tl.to(cards[k + n], { ...slot(n), duration: 0.6 * STEP, ease: "sine.out" }, at(0.4));
          }
          tl.addLabel(cardLabel(k), t0 + STEP);
        }

        // Deck → overview grid: every card travels to its tile.
        cards.forEach((card, i) => {
          tl.fromTo(
            card,
            { width: () => layout.deckW, height: () => layout.cardH },
            {
              width: () => layout.tileW,
              height: () => layout.tileH,
              duration: GRID - 0.1,
              immediateRender: false,
            },
            GRID_AT + 0.05,
          ).to(
            card,
            {
              x: () => layout.slots[i].x,
              y: () => layout.slots[i].y,
              yPercent: 0,
              rotateX: 0,
              scale: 1,
              autoAlpha: 1,
              borderColor: LINE,
              duration: GRID - 0.1,
            },
            GRID_AT + 0.05,
          );
        });
        tl.to(aside, { x: -40, autoAlpha: 0, duration: 0.3 }, GRID_AT)
          .to(fullFaces, { autoAlpha: 0, duration: 0.35 }, GRID_AT + 0.05)
          .to(tileFaces, { autoAlpha: 1, duration: 0.45 }, GRID_AT + 0.5)
          .addLabel("grid", GRID_AT + GRID)
          .to({}, { duration: END_HOLD }, GRID_AT + GRID)
          .addLabel("end", GRID_AT + GRID + END_HOLD);

        // Heading words: when the section enters the viewport, not when it pins.
        gsap.from(split.words, {
          yPercent: 100,
          duration: 0.6,
          stagger: 0.06,
          ease: "expo.out",
          scrollTrigger: {
            trigger: stage,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        syncFromTime(tl.time());

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", measure);
          typing?.kill();
          chipsIn?.kill();
          cards.forEach((card) => {
            const { lines, cursor, chips } = logParts(card);
            gsap.set([...lines, ...chips, ...(cursor ? [cursor] : [])], { clearProps: "all" });
          });
          split.revert();
          cards.forEach((card, i) => {
            card.inert = false;
            card.removeAttribute("aria-hidden");
            fullFaces[i].inert = false;
            tileFaces[i].inert = false;
          });
          aside.inert = false;
        };
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="work"
      data-work-root
      data-mode="deck"
      data-fit="normal"
      className="group/work relative flex h-svh min-h-[600px] flex-col overflow-clip pt-14"
    >
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-6 pb-6 pt-7">
        {/* Above the deck, so a card flying out never covers it. */}
        <header className="relative z-20 mb-6 shrink-0 group-data-[fit=tight]/work:hidden">
          <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
            <span className="text-accent">{work.index}</span>
            <span className="mx-2 text-line">/</span>
            {work.label}
          </p>
          <h2
            data-work-title
            className="font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-bold leading-[1.1] tracking-tight text-ink"
          >
            {work.title}
          </h2>
        </header>

        <p data-work-live className="sr-only" aria-live="polite" />

        <div data-work-body className="relative grid min-h-0 flex-1 grid-cols-[210px_1fr] gap-10">
          {/* Left: index + odometer */}
          {/* (Step 5 put the odometer at the bottom of this column.) */}
          <aside data-work-index className="flex flex-col pt-9">
            {/* Visual odometer; screen readers get the live text above. */}
            <div
              className="mb-5 flex items-baseline font-display text-[84px] font-bold leading-none tabular-nums text-ink"
              aria-hidden="true"
            >
              <span>0</span>
              <span className="h-[1em] overflow-hidden">
                <span data-odometer className="flex flex-col">
                  {projects.map((project) => (
                    <span key={project.index} className="h-[1em]">
                      {Number(project.index)}
                    </span>
                  ))}
                </span>
              </span>
              <span className="ml-3 font-mono text-[14px] font-normal text-muted">
                / {String(TOTAL).padStart(2, "0")}
              </span>
            </div>

            <nav aria-label={work.indexLabel} className="relative">
              <span
                data-index-bar
                className="absolute left-0 top-0 h-9 w-[2px] bg-accent"
                aria-hidden="true"
              />
              <ol>
                {projects.map((project, i) => (
                  <li key={project.index}>
                    <a
                      data-index-link
                      href={`#work-${project.index}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToWorkLabel(cardLabel(i));
                      }}
                      className="flex h-9 items-center gap-3 pl-4 text-[14px] text-muted transition-colors hover:text-ink aria-[current]:text-ink"
                    >
                      <span className="font-mono text-[12px]">{project.index}</span>
                      <span className="truncate">{project.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

          </aside>

          {/* Right: the deck. Cards share one grid cell. LazyMotion loads the
              DOM renderer the slim <m.div> shells need. */}
          <div data-deck className="mt-9 grid content-start self-start">
            <LazyMotion features={domAnimation} strict>
              {projects.map((project, i) => (
                <DeckCard key={project.index} project={project} i={i} />
              ))}
            </LazyMotion>
          </div>

          {/* Overview-grid targets: measured, never painted. */}
          <div
            className="pointer-events-none invisible absolute inset-0 grid grid-cols-2 grid-rows-3 gap-4"
            aria-hidden="true"
          >
            {projects.map((project) => (
              <div key={project.index} data-slot />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
