import type { Plugin } from 'vite'
import { Options, ResolvedOptions } from './types'
import { generateComponentFromPath, isIconPath, normalizeIconPath } from './loader'

function getVueVersion() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const vue = require('vue')
    const version = vue?.default?.version || vue?.version || '3'
    return version.startsWith('2.') ? 'vue2' : 'vue3'
  }
  catch {
    return 'vue3'
  }
}

function VitePluginIcons(userOptions: Options = {}): Plugin {
  const options: ResolvedOptions = {
    scale: 1.2,
    defaultStyle: '',
    defaultClass: '',
    compiler: userOptions.compiler || getVueVersion(),
    ...userOptions,
  }

  return {
    name: 'vite-plugin-icons',
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
