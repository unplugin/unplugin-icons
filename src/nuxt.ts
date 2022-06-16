import type { Options } from './types'
import unplugin from '.'

export default function (this: any, options: Options = {}) {
  if (this.nuxt?._version?.startsWith('3.'))
    options.compiler = 'vue3'

  // install webpack plugin
  this.nuxt.hook('webpack:config', (configs: any[]) => {
    configs.forEach((config) => {
      config.plugins = config.plugins || []
      config.plugins.unshift(unplugin.webpack(options))
    })
  })

  // install vite plugin
  this.nuxt.hook('vite:extend', async (vite: any) => {
    vite.config.plugins = vite.config.plugins || []
    vite.config.plugins.push(unplugin.vite(options))
  })
}
