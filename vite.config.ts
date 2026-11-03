import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        en: resolve(__dirname, "en/index.html"),
        ru: resolve(__dirname, "ru/index.html"),
        "aviso-legal": resolve(__dirname, "aviso-legal/index.html"),
        privacidad: resolve(__dirname, "privacidad/index.html"),
        404: resolve(__dirname, "404.html"),
      },
    },
  },
});
