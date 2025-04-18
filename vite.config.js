import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.ONEMAP_API_KEY": JSON.stringify(env.ONEMAP_API_KEY),
      "process.env.PORT": JSON.stringify(env.PORT),
      "process.env.SERVER_URL": JSON.stringify(env.SERVER_URL),
    },
    plugins: [react(), tailwindcss()],
    build: {
      outDir: "./dist",
      emptyOutDir: true,
    },
  };
});
