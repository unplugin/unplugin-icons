import createDebugger from 'debug'
import { CustomIconLoader, InlineCollection, ResolvedOptions } from '../types'

const debug = createDebugger('unplugin-icons:custom')

export async function getCustomIcon(
  custom: CustomIconLoader | InlineCollection,
  collection: string,
  icon: string,
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

  const scale = options?.scale || 1

  if (result) {
    if (!result.startsWith('<svg '))
      console.warn(`Custom icon "${icon}" in "${collection}" is not a valid SVG`)
    return result.replace('<svg ', `<svg height="${scale}em" width="${scale}em" `)
  }
}
