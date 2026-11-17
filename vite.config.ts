import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // The lazy 3D chunk (three.js + R3F) is about 671 kB before gzip (181 kB
    // gzipped) and is expected to be: it loads on idle, on desktop only. Raise
    // the warning threshold just past it so a real regression still warns.
    chunkSizeWarningLimit: 700,
  },
});
