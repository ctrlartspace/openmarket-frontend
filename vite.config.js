import { defineConfig } from "vite"
import { resolve } from "path"
import vue from "@vitejs/plugin-vue"
import mkcert from "vite-plugin-mkcert"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  server: { https: false },
  base: "/",
  plugins: [
    vue(),
    mkcert(),
    VitePWA({
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,jpg,png,svg,gif,webmanifest}"],
      },
      includeAssets: ["**/*.{png}"],
      manifest: {
        name: "Open Kassa",
        short_name: "Open Kassa",
        description: "Open Kassa",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "#root": resolve(__dirname),
    },
  },
})
