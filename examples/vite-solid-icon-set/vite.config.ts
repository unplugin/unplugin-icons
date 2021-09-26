import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import Icons from 'unplugin-icons/vite'


export default defineConfig({
  plugins: [
    solidPlugin(),
    Icons({
      compiler: 'jsx',
      jsx: 'preact',
    }),
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
