import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig(() => ({
  plugins: [react(), cloudflare()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
