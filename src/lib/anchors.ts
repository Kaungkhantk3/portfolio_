import type { MouseEvent } from "react";
import { ScrollTrigger } from "./gsap";
import { lenisRef } from "./lenis";
import { STACK_PHASE } from "./stackProgress";

/** Height of the fixed nav: in-page targets stop this far below the top. */
const NAV_OFFSET = 56;

/** Sections the nav can highlight, in page order. */
const SECTION_IDS = ["stack", "work", "experience", "contact"];

const scrollToY = (y: number) => {
  // Lenis animates; without it (reduced motion) the jump is instant.
  if (lenisRef.current) lenisRef.current.scrollTo(y);
  else window.scrollTo({ top: y });
};

/**
 * On desktop, #stack and #work live inside pinned stages, so their anchors are
 * scroll positions inside a pin rather than element tops. Returns null when
 * the section is not pinned (static layout).
 */
function pinnedTarget(href: string): number | null {
  if (href === "#stack") {
    const pin = ScrollTrigger.getById("stack");
    // Just past the point where the layer chips are in.
    return pin ? pin.start + (pin.end - pin.start) * (STACK_PHASE.moveEnd + 0.1) : null;
  }
  if (href === "#work") {
    const pin = ScrollTrigger.getById("work");
    return pin ? pin.labelToScroll("card-1") : null;
  }
  return null;
}

/** Scroll position for an in-page link, or null if it has no target. */
function targetY(href: string): number | null {
  if (href === "#hero" || href === "#") return 0;
  const pinned = pinnedTarget(href);
  if (pinned !== null) return pinned;
  const el = href.length > 1 ? document.getElementById(href.slice(1)) : null;
  return el ? Math.max(el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET, 0) : null;
}

/**
 * Scroll to an in-page target and put its hash in the URL without the
 * browser's own jump. Returns false if the target does not exist.
 */
export function scrollToHash(href: string, updateUrl = true) {
  const y = targetY(href);
  if (y === null) return false;
  scrollToY(y);
  if (updateUrl) {
    const url = href === "#hero" || href === "#" ? window.location.pathname + window.location.search : href;
    window.history.replaceState(null, "", url);
  }
  return true;
}

/** onClick for every in-page link (nav, logo, hero CTAs). */
export function handleAnchorClick(e: MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute("href") ?? "";
  if (!href.startsWith("#")) return;
  if (scrollToHash(href)) e.preventDefault();
}

/** Scroll to a label of the Selected work timeline (index links). */
export function scrollToWorkLabel(label: string) {
  const pin = ScrollTrigger.getById("work");
  if (pin) scrollToY(pin.labelToScroll(label));
}

/**
 * Which section the reader is in, for the nav highlight. "" while in the hero.
 * Pinned sections are judged by their pin: "stack" starts once the plates
 * have spread, "work" shortly before the deck pins.
 */
export function currentSection() {
  const y = window.scrollY;
  const lead = window.innerHeight * 0.4;
  let current = "";
  for (const id of SECTION_IDS) {
    const pin = id === "stack" || id === "work" ? ScrollTrigger.getById(id) : undefined;
    let start: number | null = null;
    if (pin) {
      start = id === "stack" ? pin.start + (pin.end - pin.start) * STACK_PHASE.explodeEnd : pin.start - lead;
    } else {
      const el = document.getElementById(id);
      if (el) start = el.getBoundingClientRect().top + y - lead;
    }
    if (start !== null && y >= start) current = id;
  }
  return current;
}
