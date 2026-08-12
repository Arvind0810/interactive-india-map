import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-india-map": path.resolve(__dirname, "../src/index.jsx"),
    },
    dedupe: ["react", "react-dom", "framer-motion"],
  },
  optimizeDeps: {
    include: ["framer-motion"],
  },
});
