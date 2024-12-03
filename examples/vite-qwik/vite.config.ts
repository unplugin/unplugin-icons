import { qwikVite } from '@builder.io/qwik/optimizer'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(() => {
  return {
    plugins: [
      Icons({
        autoInstall: true,
        compiler: 'qwik',
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
