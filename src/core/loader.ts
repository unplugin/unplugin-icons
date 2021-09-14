// @ts-expect-error
import IconifyTools from '@iconify/json-tools'
import { ResolvedOptions } from '../types'
import { compilers } from './compilers'

export interface ResolvedIconPath {
  collection: string
  icon: string
  query: Record<string, string | undefined>
}

const URL_PREFIXES = ['/~icons/', '~icons/', 'virtual:icons/', 'virtual/icons/']
const iconPathRE = new RegExp(`${URL_PREFIXES.map(v => `^${v}`).join('|')}`)

const { SVG, Collection } = IconifyTools

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

// @ts-expect-error
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

export function getBuiltinIcon(collection: string, icon: string) {
  const icons = getCollection(collection)
  if (!icons)
    return null

  let data: any
  for (const trans of _idTransforms) {
    data = icons.getIconData(trans(icon))
    if (data)
      return data
  }
  return null
}

export async function getIcon(collection: string, icon: string, options: ResolvedOptions) {
  const { scale } = options

  const custom = options.customCollections[collection]

  if (custom) {
    let result: string | undefined | null

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
      if (!result.startsWith('<svg '))
        console.warn(`Custom icon "${icon}" in "${collection}" is not a valid SVG`)
      return result.replace('<svg ', `<svg height="${scale}em" width="${scale}em" `)
    }
  }

  const iconData = getBuiltinIcon(collection, icon)

  const svg = new SVG(iconData)
  const svgText: string = svg.getSVG({
    height: `${scale}em`,
    width: `${scale}em`,
  })

  return svgText
}

export async function generateComponent({ collection, icon }: ResolvedIconPath, options: ResolvedOptions) {
  let svg = await getIcon(collection, icon, options)
  if (!svg)
    throw new Error(`Icon \`${collection}:${icon}\` not found`)

  const { defaultStyle, defaultClass } = options

  if (defaultClass)
    svg = svg.replace('<svg ', `<svg class="${defaultClass}" `)
  if (defaultStyle)
    svg = svg.replace('<svg ', `<svg style="${defaultStyle}" `)

  const compiler = compilers[options.compiler]
  if (!compiler)
    throw new Error(`Unknown compiler: ${options.compiler}`)

  return compiler(svg, collection, icon, options)
}

export async function generateComponentFromPath(path: string, options: ResolvedOptions) {
  const resolved = resolveIconsPath(path)
  if (!resolved)
    return null
  return generateComponent(resolved, options)
}
