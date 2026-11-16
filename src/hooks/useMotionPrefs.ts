import { useSyncExternalStore } from "react";

// export const DESKTOP_QUERY = "(min-width: 900px)";  (steps 1–3b)
// Pinned layouts also need some height: very short windows get the static path.
export const DESKTOP_QUERY = "(min-width: 900px) and (min-height: 600px)";
export const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
/** Same condition as `fullMotion`, for gsap.matchMedia(). */
export const FULL_MOTION_QUERY = `${DESKTOP_QUERY} and (prefers-reduced-motion: no-preference)`;

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** isDesktop: ≥900px (3D + pinning allowed). reducedMotion: static everything. */
export function useMotionPrefs() {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const reducedMotion = useMediaQuery(REDUCED_QUERY);
  return { isDesktop, reducedMotion, fullMotion: isDesktop && !reducedMotion };
}
