import { createUnplugin } from 'unplugin'
import { getVueVersion } from './core/utils'
import { Options, ResolvedOptions } from './types'
import { generateComponentFromPath, isIconPath, normalizeIconPath } from './core/loader'

const unplugin = createUnplugin<Options>((options = {}) => {
  const resolved: ResolvedOptions = {
    scale: 1.2,
    defaultStyle: '',
    defaultClass: '',
    compiler: options.compiler || getVueVersion(),
    ...options,
  }

  return {
    name: 'unplugin-icons',
    resolveId(id) {
      if (isIconPath(id))
        return normalizeIconPath(id).replace(/\.vue$/i, '').replace(/^\//, '')
      return null
    },
    async load(id) {
      if (id && isIconPath(id))
        return await generateComponentFromPath(id, resolved) || null
      return null
    },
  }
})

export * from './types'

export default unplugin
