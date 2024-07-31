import { defineConfig } from 'astro/config'
import Vue from '@astrojs/vue'
import Icons from 'unplugin-icons/vite'


// https://astro.build/config
export default defineConfig({
  integrations: [
    Vue()
  ],
  vite: {
    plugins: [
      Icons({
        compiler: 'vue3',
      }),
    ],
  },
})
