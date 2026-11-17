import { flags } from "../data/content";

/**
 * Plate → card 01 handoff switch. content.ts decides the default
 * (flags.enableFlipHandoff); ?handoff=1 or ?handoff=0 in the URL overrides it
 * so both versions can be compared in the browser without a code change.
 */
export function handoffEnabled() {
  const param = new URLSearchParams(window.location.search).get("handoff");
  if (param === "1") return true;
  if (param === "0") return false;
  return flags.enableFlipHandoff;
}

/**
 * Shared between the handoff overlay (writer of plateOpacity, reader of quad)
 * and the R3F scene (the reverse). Plain object, read every frame.
 */
export const handoffState = {
  /** True while the overlay is mounted: the scene then tracks the top face. */
  active: false,
  /** Opacity of the top (accent) plate, 1 → 0 as the ghost takes over. */
  plateOpacity: 1,
  /**
   * The top plate's top face in viewport pixels, as x,y pairs in the order
   * far corner, right corner, near corner, left corner. Written by the scene.
   */
  quad: [0, 0, 0, 0, 0, 0, 0, 0],
};
