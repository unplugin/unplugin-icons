import createDebugger from 'debug'
import { ResolvedOptions } from '../..'

const debug = createDebugger('unplugin-icons:legacy')
const debugCollection = createDebugger('unplugin-icons:legacy:collection')

const _legacyCollections: Record<string, any> = {}

export async function loadLegacyCollection(name: string) {
  // @ts-expect-error
  const { Collection } = (await import('@iconify/json-tools')).default

  if (!_legacyCollections[name]) {
    debugCollection(`${name}`)
    const collection = new Collection()
    collection.loadIconifyCollection(name)
    _legacyCollections[name] = collection
  }
  return _legacyCollections[name]
}

export const isIconifyJsonPresent = (async() => {
  try {
    // @ts-expect-error
    await import('@iconify/json/package.json')
    debugCollection('@iconify/json fond')
    return true
  }
  catch (e) {
    return false
  }
})()

export async function searchForLegacyIcon(
  collection: string,
  ids: string[],
  options?: ResolvedOptions,
) {
  const icons = await loadLegacyCollection(collection)
  if (!icons?.items)
    return null

  let iconData: any
  for (const id of ids) {
    iconData = icons.getIconData(id)
    if (iconData) {
      debug(`${collection}:${id}`)
      const scale = options?.scale ?? 1
      // @ts-expect-error
      const { SVG } = (await import('@iconify/json-tools')).default
      const svg = new SVG(iconData)
      const svgText: string = svg.getSVG({
        height: `${scale}em`,
        width: `${scale}em`,
      })
      return svgText
    }
  }

  return null
}
