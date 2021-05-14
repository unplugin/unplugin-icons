// @ts-ignore
import { SVG, Collection } from '@iconify/json-tools'
import { Vue2Compiler } from './compiler/vue2'
import { Vue3Compiler } from './compiler/vue3'
import { URL_PREFIXES } from './constants'
import { ResolvedOptions } from './types'

export interface ResolvedIconPath {
  collection: string
  icon: string
  query: Record<string, string | undefined>
}

const iconPathRE = new RegExp(`${URL_PREFIXES.map(v => `^${v}`).join('|')}`)

export function isIconPath(path: string) {
  return iconPathRE.test(path)
}

export function normalizeIconPath(path: string) {
  return path.replace(iconPathRE, URL_PREFIXES[0])
}

export function resolveIconsPath(path: string): ResolvedIconPath | null {
  if (!isIconPath(path))
    return null

  path = path.replace(iconPathRE, '')

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

const _idTransforms: ((str: string) => string)[] = [
  str => str,
  str => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
  str => str.replace(/([a-z])(\d+)/g, '$1-$2'),
]

export async function generateComponent({ collection: name, icon }: ResolvedIconPath, options: ResolvedOptions) {
  let collection = _collections[name]
  if (!collection) {
    collection = new Collection()
    collection.loadIconifyCollection(name)
    _collections[name] = collection
  }
  if (!collection)
    return null

  let data: any
  for (const trans of _idTransforms) {
    data = collection.getIconData(trans(icon))
    if (data)
      break
  }
  if (!data)
    return null

  const { scale, defaultStyle, defaultClass } = options
  const svg = new SVG(data)
  const svgText: string = svg.getSVG({
    height: `${scale}em`,
    width: `${scale}em`,
    style: defaultStyle,
    class: defaultClass,
  })

  if (!svgText)
    return null

  if (options.compiler === 'vue2')
    return Vue2Compiler(svgText, name, icon)
  else
    return Vue3Compiler(svgText, name, icon)
}

export async function generateComponentFromPath(path: string, options: ResolvedOptions) {
  const resolved = resolveIconsPath(path)
  if (!resolved)
    return null
  return generateComponent(resolved, options)
}
