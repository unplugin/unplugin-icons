import type { Plugin } from 'vite'
import { Options, ResolvedOptions } from './types'
import { generateComponentFromPath, isIconPath, normalizeIconPath } from './loader'

function VitePluginIcons(userOptions: Options = {}): Plugin {
  let options: ResolvedOptions

  return {
    name: 'vite-plugin-icons',
    enforce: 'post',
    configResolved(config) {
      options = Object.assign({
        scale: 1.2,
        defaultStyle: '',
        defaultClass: '',
        compiler: config.plugins.find(i => i.name === 'vite-plugin-vue2') ? 'vue2' : 'vue3',
      }, userOptions)
    },
    resolveId(id) {
      if (isIconPath(id)) {
        // need to a relative path in for vite to resolve node_modules in build
        return normalizeIconPath(id).replace(/\.vue$/i, '').replace(/^\//, '')
      }
      return null
    },
    async load(id) {
      if (isIconPath(id))
        return await generateComponentFromPath(id, options) || null

      return null
    },
  }
}

export { VitePluginIcons as Plugin }
export * from './resolver'

export default VitePluginIcons
