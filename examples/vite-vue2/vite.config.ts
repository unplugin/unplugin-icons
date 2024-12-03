import type { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue2'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'

const config: UserConfig = {
  plugins: [
    Vue(),
    Components({
      resolvers: [
        IconsResolver(),
      ],
    }),
    Icons({
      defaultClass: 'text-red-100',
      defaultStyle: 'color: green',
      compiler: 'vue2',
    }),
  ],
}

export default config
