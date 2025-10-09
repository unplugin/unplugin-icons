import { ember, extensions } from '@embroider/vite'
import { babel } from '@rollup/plugin-babel'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    ember(),
    Icons({
      compiler: 'ember',
    }),
    // extra plugins here
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],
})
