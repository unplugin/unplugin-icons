// @ts-expect-error
import Tools from '@iconify/json-tools'
import createDebugger from 'debug'
import { ResolvedOptions } from '../..'

const debug = createDebugger('unplugin-icons:legacy')
const debugCollection = createDebugger('unplugin-icons:legacy:collection')

const _legacyCollections: Record<string, any> = {}

const { SVG, Collection } = Tools

export async function loadLegacyCollection(name: string) {
  if (!_legacyCollections[name]) {
    debugCollection(`${name}`)
    const collection = new Collection()
    collection.loadIconifyCollection(name)
    _legacyCollections[name] = collection
  }
  return _legacyCollections[name]
}

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
