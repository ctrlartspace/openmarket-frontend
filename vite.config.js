import { defineConfig } from "vite"
import { resolve } from "path"
import vue from "@vitejs/plugin-vue"
import mkcert from "vite-plugin-mkcert"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: false },
  base: "./",
  plugins: [
    vue(),
    mkcert(),
    VitePWA({
      // devOptions: {
      //   enabled: true,
      // },
      injectRegister: null,

      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,jpg,png,svg,gif,webmanifest}"],
      },
      includeAssets: ["**/*.{png}"],
      manifest: {
        name: "My Awesome App",
        short_name: "MyApp",
        description: "My Awesome App description",
        theme_color: "#ffffff",
        icons: [
          {
            src: "assets/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "assets/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
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
