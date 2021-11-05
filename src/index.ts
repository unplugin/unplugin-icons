import { createUnplugin } from 'unplugin'
import { resolveOptions } from './core/options'
import { generateComponentFromPath, isIconPath, normalizeIconPath } from './core/loader'
import { Options } from './types'

const unplugin = createUnplugin<Options>((options = {}) => {
  const resolved = resolveOptions(options)

  return {
    name: 'unplugin-icons',
    enforce: 'pre',
    resolveId(id) {
      if (isIconPath(id)) {
        const res = normalizeIconPath(id)
          .replace(/\.\w+$/i, '')
          .replace(/^\//, '')
        if (options.compiler) {
          if (typeof options.compiler === 'string') {
            switch (options.compiler || '') {
              case 'jsx':
                return `${res}.jsx`
              case 'svelte':
                return `${res}.svelte`
              case 'solid':
                return `${res}.tsx`
              case 'marko':
                return `${res}.marko`
              default:
                return res
            }
          }
          else {
            const ext = options.compiler.extension
            if (ext)
              return `${res}.${ext.startsWith('.') ? ext.slice(1) : ext}`
          }
        }
      }
      return null
    },
    async load(id) {
      const config = await resolved
      if (isIconPath(id)) {
        const code = await generateComponentFromPath(id, config) || null
        if (code) {
          return {
            code,
            map: { version: 3, mappings: '', sources: [] } as any,
          }
        }
      }

      return null
    },
  }
})

export * from './types'

export default unplugin
