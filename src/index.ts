import type { Plugin } from 'vite'
import { Options, ResolvedOptions } from './types'
import { createServerPlugin } from './server'
import { createRollupPlugin } from './build'

function VitePluginIcons(options: Options = {}): Plugin {
  const resolved: ResolvedOptions = Object.assign({}, options)

  return {
    configureServer: createServerPlugin(resolved),
    rollupInputOptions: {
      plugins: [createRollupPlugin(resolved)],
    },
  }
}

export default VitePluginIcons
