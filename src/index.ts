import type { Plugin } from 'vite'
import { Options, ResolvedOptions } from './types'
import { generateComponentFromPath, isIconPath } from './loader'

function VitePluginIcons(options: Options = {}): Plugin {
  const resolved: ResolvedOptions = Object.assign({
    scale: 1.2,
    defaultStyle: 'vertical-align: middle; transform: translateY(-5%);',
  }, options)

  return {
    name: 'vite-plugin-icons',
    enforce: 'pre',
    resolveId(id) {
      if (isIconPath(id))
        return id.replace(/\.vue$/i, '')
      return null
    },
    async load(id) {
      return await generateComponentFromPath(id, resolved) || null
    },
  }
}

export { VitePluginIcons as Plugin }
export * from './resolver'

export default VitePluginIcons
