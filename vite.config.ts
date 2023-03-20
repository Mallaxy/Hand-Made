import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

const __dirname = path.resolve();
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@helpers": "/src/helpers",
      "@subproject": path.resolve(__dirname, "/packages/subproject"),
    },
  },
});
