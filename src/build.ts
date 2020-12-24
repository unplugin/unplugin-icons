import type { Plugin } from 'vite'
import { isIconPath, generateComponentFromPath } from './loader'
import { ResolvedOptions } from './types'

/** The type of the elements of an array. */
type ElementType<T extends Array<any>> = T extends Array<infer R> ? R : never
type RollupPlugin = ElementType<
NonNullable<NonNullable<Plugin['rollupInputOptions']>['pluginsPostBuild']>
>

export function createRollupPlugin(options: ResolvedOptions): RollupPlugin {
  return {
    name: 'vite-plugin-icons',
    resolveId(source) {
      if (isIconPath(source))
        return source.replace(/.vue$/i, '')
      return null
    },
    async load(id) {
      return await generateComponentFromPath(id, options) || null
    },
  }
}
