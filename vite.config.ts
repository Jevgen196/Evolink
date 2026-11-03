import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        en: resolve(__dirname, "en.html"),
        ru: resolve(__dirname, "ru.html"),
        "aviso-legal": resolve(__dirname, "aviso-legal.html"),
        privacidad: resolve(__dirname, "privacidad.html"),
        404: resolve(__dirname, "404.html"),
      },
    },
  },
});
