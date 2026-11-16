// Geometry and colours of the three-plate stack, shared by the SVG fallback
// and the R3F scene so the two line up exactly when the canvas swaps in.
// Units are SVG user units; the R3F scene uses the same numbers as world units.
export const PLATE = {
  W: 100, // half width of a plate's top face (so a plate is 200 wide)
  H: 50, // half height of a plate's top face (2:1 = 30° camera elevation)
  T: 12, // on-screen plate thickness
  CX: 101, // horizontal centre
  VIEW_W: 202,
  VIEW_H: 210,
  CY: [51, 99, 147], // top-face centre of each plate, top → bottom
};

// top → bottom (client / api / data)
export const plateFaces = [
  { top: "#FF6A2B", left: "#C94F1C", right: "#A33F15" },
  { top: "#1C1D1A", left: "#151613", right: "#0F100E" },
  { top: "#16171A", left: "#101113", right: "#0B0C0D" },
];

export const PLATE_EDGE = "#262723";

// Label colours, top → bottom.
export const plateLabelColors = ["#FF6A2B", "#B9B6AE", "#9A978F"];
