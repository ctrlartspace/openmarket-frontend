import { defineConfig } from "vite"
import { resolve } from "path"
import vue from "@vitejs/plugin-vue"
import mkcert from "vite-plugin-mkcert"
import { VitePWA } from "vite-plugin-pwa"
import Components from "unplugin-vue-components/vite"
import { PrimeVueResolver } from "@primevue/auto-import-resolver"

export default defineConfig({
  server: { https: false },
  base: "/",
  plugins: [
    vue(),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
    mkcert(),
    VitePWA({
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,jpg,png,svg,gif,webmanifest}"],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /\.(?:js|css|html)$/,
            handler: "NetworkFirst", // Приоритет сети над кэшем
            options: {
              cacheName: "runtime-cache",
            },
          },
        ],
      },
      includeAssets: ["**/*.{png}"],
      manifest: {
        name: "Open Kassa",
        short_name: "Open Kassa",
        description: "Open Kassa",
        theme_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "android-chrome-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "android-chrome-maskable-512x512.png",
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
