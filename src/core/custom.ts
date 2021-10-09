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
    const startSvg = result.indexOf('<svg ')
    if (startSvg === -1 || startSvg > 0)
      console.warn(`Custom icon "${icon}" in "${collection}" is not a valid SVG`)
    // prevent adding width and height twice on css
    if (options?.compiler === 'css' && startSvg > -1) {
      const closeSvg = result.indexOf('>', startSvg + 5)
      let idx = result.indexOf('width')
      if (idx > -1 && closeSvg > idx)
        return result
      idx = result.indexOf('height', startSvg + 5)
      if (idx > -1 && closeSvg > idx)
        return result
    }
    return result.replace('<svg ', `<svg height="${scale}em" width="${scale}em" `)
  }
}
