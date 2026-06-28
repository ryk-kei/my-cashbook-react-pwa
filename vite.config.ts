import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
const repoName = "my-cashbook-react-pwa";
export default defineConfig({
  base: `/${repoName}/`,
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      injectRegister: "auto",
      includeAssets: ["assets/favicon.svg"],

      manifest: {
        name: "My Cashbook PMA",
        short_name: "Cashbook",
        description: "test app",
        start_url: `/${repoName}/`,
        display: "standalone",
        background_color: "#000000",
        theme_color: "#ffffff",
        icons: [
          {
            src: "./icons/192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./icons/512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,json}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
