import { useSyncExternalStore } from "react";

export const DESKTOP_QUERY = "(min-width: 900px)";
export const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

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
