import { defineConfig } from "vite"
import { resolve } from "path"
import vue from "@vitejs/plugin-vue"
import mkcert from "vite-plugin-mkcert"

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: false },
  plugins: [vue(), mkcert()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "#root": resolve(__dirname),
    },
  },
})
