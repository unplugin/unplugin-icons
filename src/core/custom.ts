import createDebugger from 'debug'
import type { CustomIconLoader, InlineCollection, ResolvedOptions } from '../types'
import { mergeIconProps } from './utils'

const debug = createDebugger('unplugin-icons:custom')

export async function getCustomIcon(
  custom: CustomIconLoader | InlineCollection,
  collection: string,
  icon: string,
  query: Record<string, string | undefined>,
  options?: ResolvedOptions) {
  let result: string | undefined | null

  debug(`${collection}:${icon}`)

  if (typeof custom === 'function') {
    result = await custom(icon)
  }
  else {
    const inline = custom[icon]
    result = typeof inline === 'function'
      ? await inline()
      : inline
  }

  if (result) {
    if (!result.startsWith('<svg ')) {
      console.warn(`Custom icon "${icon}" in "${collection}" is not a valid SVG`)
      return result
    }
    return await mergeIconProps(result, collection, icon, query, undefined, options)
  }
}
