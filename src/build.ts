import type { Plugin } from 'vite'
import { isIconPath, generateComponentFromPath } from './resolver'
import { Options } from './types'

/** The type of the elements of an array. */
type ElementType<T extends Array<any>> = T extends Array<infer R> ? R : never
type RollupPlugin = ElementType<
NonNullable<NonNullable<Plugin['rollupInputOptions']>['pluginsPostBuild']>
>

export function createRollupPlugin(options: Options): RollupPlugin {
  return {
    name: 'vite-plugin-icons',
    resolveId(source) {
      if (isIconPath(source))
        return source

      return null
    },
    async load(id) {
      return await generateComponentFromPath(id)
    },
  }
}
