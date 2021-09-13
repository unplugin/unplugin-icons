// @ts-ignore
import jsonTools from '@iconify/json-tools'
import { ResolvedOptions } from '../types'
import { compilers } from './compilers'

export interface ResolvedIconPath {
  collection: string
  icon: string
  query: Record<string, string | undefined>
}

const URL_PREFIXES = ['/~icons/', '~icons/', 'virtual:icons/', 'virtual/icons/']
const iconPathRE = new RegExp(`${URL_PREFIXES.map(v => `^${v}`).join('|')}`)

const { SVG, Collection } = jsonTools

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

  // remove extension
  path = path.replace(/\.\w+$/, '')

  const [collection, icon] = path.split('/')

  return {
    collection,
    icon,
    query,
  }
}

// @ts-ignore
const _collections: Record<string, Collection> = {}

const _idTransforms: ((str: string) => string)[] = [
  str => str,
  str => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
  str => str.replace(/([a-z])(\d+)/g, '$1-$2'),
]

export function getCollection(name: string) {
  if (!_collections[name]) {
    const collection = new Collection()
    collection.loadIconifyCollection(name)
    _collections[name] = collection
  }
  return _collections[name]
}

export function getIcon(name: string, icon: string) {
  const collection = getCollection(name)
  if (!collection)
    return null

  let data: any
  for (const trans of _idTransforms) {
    data = collection.getIconData(trans(icon))
    if (data)
      return data
  }
  return null
}

export async function generateComponent({ collection, icon }: ResolvedIconPath, options: ResolvedOptions) {
  const data = getIcon(collection, icon)
  if (!data)
    throw new Error(`Icon \`${collection}:${icon}\` not found`)

  const { scale, defaultStyle, defaultClass } = options
  const svg = new SVG(data)
  let svgText: string = svg.getSVG({
    height: `${scale}em`,
    width: `${scale}em`,
  })

  if (!svgText)
    return null

  if (defaultClass)
    svgText = svgText.replace('<svg ', `<svg class="${defaultClass}" `)
  if (defaultStyle)
    svgText = svgText.replace('<svg ', `<svg style="${defaultStyle}" `)

  const compiler = compilers[options.compiler]
  if (!compiler)
    throw new Error(`Unknown compiler: ${options.compiler}`)

  return compiler(svgText, collection, icon, options)
}

export async function generateComponentFromPath(path: string, options: ResolvedOptions) {
  const resolved = resolveIconsPath(path)
  if (!resolved)
    return null
  return generateComponent(resolved, options)
}
