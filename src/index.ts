import type { Plugin } from 'vite'
import { Options, ResolvedOptions } from './types'
import { generateComponentFromPath, isIconPath } from './loader'

function VitePluginIcons(options: Options = {}): Plugin {
  const resolved: ResolvedOptions = Object.assign({
    scale: 1.2,
    defaultStyle: 'vertical-align: middle; transform: translateY(-5%);',
    compiler: 'vue3',
  }, options)

  return {
    name: 'vite-plugin-icons',
    enforce: 'post',
    resolveId(id) {
      if (isIconPath(id)) {
        // need to a relative path in for vite to resolve node_modules in build
        return id.replace(/\.vue$/i, '').slice(1)
      }
      return null
    },
    async load(id) {
      const path = `/${id}`
      if (isIconPath(path))
        return await generateComponentFromPath(path, resolved) || null

      return null
    },
  }
}

export { VitePluginIcons as Plugin }
export * from './resolver'

export default VitePluginIcons
