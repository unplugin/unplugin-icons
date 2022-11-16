import type { Options } from './types'
import unplugin from '.'

export default function (this: any, options: Options = {}, nuxt: any) {
  const nuxtApp = this?.nuxt || nuxt

  if (nuxtApp?._version?.startsWith('3.'))
    options.compiler = 'vue3'

  // install webpack plugin
  nuxtApp.hook('webpack:config', (configs: any[]) => {
    configs.forEach((config) => {
      config.plugins = config.plugins || []
      config.plugins.unshift(unplugin.webpack(options))
    })
  })

  // install vite plugin
  nuxtApp.hook('vite:extend', async (vite: any) => {
    vite.config.plugins = vite.config.plugins || []
    vite.config.plugins.push(unplugin.vite(options))
  })
}
