import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "RMG Utilities for Stellaris",
        short_name: "RMG Utils",
        description:
          "RMG Utils is an application that RMG is using to expediate some parts of the mod-making process.",
        theme_color: "#25262b",
        icons: [
          {
            src: "/assets/images/rmg_logo_192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/images/rmg_logo_512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/images/maskable_icon_x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/assets/images/maskable_icon_x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
});
