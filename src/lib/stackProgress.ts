// Shared between the 01 Stack pinned timeline (writer) and the R3F plates
// (reader, in useFrame). Plain object: no React state, no re-renders.
export const stackProgress = {
  /** Timeline progress, 0 → 1. */
  current: 0,
  /** World-space distance between plates when fully exploded (set on refresh). */
  stepWorld: 0,
};

// Phase boundaries of the timeline, as fractions of its length.
export const STACK_PHASE = { explodeEnd: 0.25, moveEnd: 0.6 };

// Camera elevation drops by this much while the stack explodes.
export const STACK_TILT = (10 * Math.PI) / 180;
