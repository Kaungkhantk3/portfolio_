import type Lenis from "lenis";

// The one Lenis instance (null under prefers-reduced-motion or before mount).
// Read it inside handlers / frame callbacks, never during render.
export const lenisRef: { current: Lenis | null } = { current: null };
