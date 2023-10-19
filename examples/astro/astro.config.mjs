import { defineConfig } from 'astro/config'
import Icons from 'unplugin-icons/vite'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
      }),
    ],
  },
})
