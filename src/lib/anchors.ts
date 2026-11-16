import type { MouseEvent } from "react";
import { ScrollTrigger } from "./gsap";
import { lenisRef } from "./lenis";
import { STACK_PHASE } from "./stackProgress";

const scrollToY = (y: number) => {
  if (lenisRef.current) lenisRef.current.scrollTo(y);
  else window.scrollTo({ top: y });
};

/**
 * On desktop, #stack and #work live inside pinned stages, so their anchors are
 * scroll positions inside a pin rather than element tops. Returns the target
 * scroll position, or null when the normal anchor should be used (static
 * layout, or any other link).
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

/** onClick for in-page links. */
export function handleAnchorClick(e: MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute("href") ?? "";
  const y = pinnedTarget(href);
  if (y === null) return;
  e.preventDefault();
  scrollToY(y);
}

/** Scroll to a label of the Selected work timeline (index links). */
export function scrollToWorkLabel(label: string) {
  const pin = ScrollTrigger.getById("work");
  if (pin) scrollToY(pin.labelToScroll(label));
}
