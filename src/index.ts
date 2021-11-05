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
        const compiler = options.compiler
        if (compiler) {
          if (typeof compiler === 'string') {
            switch (compiler) {
              case 'jsx':
                return `${res}.jsx`
              case 'svelte':
                return `${res}.svelte`
              case 'solid':
                return `${res}.tsx`
              case 'marko':
                return `${res}.marko`
            }
          }
          else {
            const ext = compiler.extension
            if (ext)
              return `${res}.${ext.startsWith('.') ? ext.slice(1) : ext}`
          }
          return res
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
