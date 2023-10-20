import { defineConfig } from 'vite'
import { qwikVite } from '@builder.io/qwik/optimizer'
import tsconfigPaths from 'vite-tsconfig-paths'
import Icons from 'unplugin-icons/vite'

export default defineConfig(() => {
  return {
    plugins: [
      Icons({
        autoInstall: true,
        compiler: 'qwik',
        // compiler: 'jsx',
        // jsx: 'qwik',
      }),
      qwikVite(),
      tsconfigPaths(),
    ],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  }
})
