import { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Icons, { ViteIconsResolver } from 'vite-plugin-icons'
import Components from 'vite-plugin-components'

const config: UserConfig = {
  plugins: [
    Vue(),
    Components({
      globalComponentsDeclaration: true,
      customComponentResolvers: [
        ViteIconsResolver(),
      ],
    }),
    Icons(),
  ],
}

export default config
