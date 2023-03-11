import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["react-favicon"],
  },
  build: {
    commonjsOptions: {
      include: [/react-favicon/, /node_modules/],
    },
  },
  plugins: [react()],
});
