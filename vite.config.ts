import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/jamra/",
  build: {
    outDir: "dist",
    target: "es2020",
  },
});
