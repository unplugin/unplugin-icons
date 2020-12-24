// @ts-ignore
import { SVG, Collection } from '@iconify/json-tools'
import { compileTemplate } from '@vue/compiler-sfc'
import { URL_PREFIX } from './constants'

export interface ResolvedIconPath {
  collection: string
  icon: string
  query: Record<string, string | undefined>
}

export function isIconPath(path: string) {
  return path.startsWith(URL_PREFIX)
}

export function resolveIconsPath(path: string): ResolvedIconPath | null {
  if (!isIconPath(path))
    return null

  path = path.slice(URL_PREFIX.length)

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

  const data = collection.getIconData(icon)
  if (!data)
    return null

  const svg = new SVG(data)
  const svgText: string = svg.getSVG({
    height: '1.2em',
    width: '1.2em',
    style: 'vertical-align: middle; transform: translateY(-5%);',
  })

  if (!svgText)
    return null

  let { code } = compileTemplate({
    source: svgText,
    id: `${name}:${icon}`,
    filename: `${name}-${icon}.vue`,
  })

  code = code.replace(/^export /g, '')
  code += '\n\nexport default { render }'
  code += '\n/* vite-plugin-components disabled */'

  return code
}

export async function generateComponentFromPath(path: string) {
  const resolved = resolveIconsPath(path)
  if (!resolved)
    return null
  return generateComponent(resolved)
}
