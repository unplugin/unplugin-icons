import { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'vite-plugin-components'

const config: UserConfig = {
  plugins: [
    Vue(),
    Components({
      globalComponentsDeclaration: true,
      customComponentResolvers: [
        IconsResolver(),
      ],
    }),
    Icons({
      compiler: 'vue3',
    }),
  ],
}

export default config
