import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// import jotaiDevTools from "jotai/babel/preset";

const env = process.env.RUNTIME_ENV ?? "local";

const PWA_TITLE_MAP = {
  local: "RMG Utils (local)",
  prod: "RMG Utilities for Stellaris",
  stage: "RMG Utils (stage)",
  dev: "RMG Utils (dev)",
};

const PWA_ICONS_TYPE = env === "prod" ? "" : "_" + env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: ["jotai/babel/preset"],
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: PWA_TITLE_MAP[env],
        short_name: "RMG Utils",
        description:
          "RMG Utils is an application that RMG is using to expediate some parts of the mod-making process.",
        theme_color: "#25262b",
        icons: [
          {
            src: `/assets/images/rmg_logo_192${PWA_ICONS_TYPE}.png`,
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: `/assets/images/rmg_logo_512${PWA_ICONS_TYPE}.png`,
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
    RUNTIME_ENV: JSON.stringify(env),
  },
});
