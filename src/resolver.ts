// @ts-ignore
import { SVG, Collection } from '@iconify/json-tools'
import { compileTemplate } from '@vue/compiler-sfc'

const PREFIX = '/@vite-icons/'

export interface ResolvedIconPath {
  collection: string
  icon: string
  query: Record<string, string | undefined>
}

export function isIconPath(path: string) {
  return path.startsWith(PREFIX)
}

export function resolveIconsPath(path: string): ResolvedIconPath | null {
  if (!isIconPath(path))
    return null

  path = path.slice(PREFIX.length)

  const query: ResolvedIconPath['query'] = {}
  const queryIndex = path.indexOf('?')
  if (queryIndex !== -1) {
    const queryRaw = path.slice(queryIndex + 1)
    path = path.slice(0, queryIndex)
    new URLSearchParams(queryRaw).forEach((value, key) => {
      query[value] = key
    })
  }

  if (path.endsWith('.vue'))
    path = path.slice(0, -4)

  const [collection, icon] = path.split('/')

  return {
    collection,
    icon,
    query,
  }
}

const _collections: Record<string, Collection> = {}

export async function generateComponent({ collection: name, icon, query }: ResolvedIconPath) {
  let collection = _collections[name]
  if (!collection) {
    collection = new Collection()
    collection.loadIconifyCollection(name)
    _collections[name] = collection
  }
  if (!collection)
    return null

  const svg = new SVG(collection.getIconData(icon))
  const svgText: string = svg.getSVG({
    height: '1.2em',
    width: '1.2em',
    style: 'vertical-align: middle; transform: translateY(-5%);',
  })

  let { code } = compileTemplate({
    source: svgText,
    id: `${name}:${icon}`,
    filename: `${name}-${icon}.vue`,
  })

  code = code.replace(/^export /g, '')
  code += '\n export default { render }'

  return code
}

export async function generateComponentFromPath(path: string) {
  const resolved = resolveIconsPath(path)
  if (!resolved)
    return null
  return generateComponent(resolved)
}
