// @ts-expect-error
import IconifyTools from '@iconify/json-tools'
import { IconifyJSON } from '@iconify/types'
import { getIconData } from '@iconify/utils/lib/icon-set/get-icon'
import { FullIconifyIcon } from '@iconify/utils/lib/icon'
import { iconToSVG } from '@iconify/utils/lib/svg/build'
import { defaults as DefaultIconCustomizations } from '@iconify/utils/lib/customisations'
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

// @ts-expect-error
const _collections: Record<string, Collection> = {}
const _iconSets: Record<string, IconifyJSON> = {}

function testIconifyJsonPresent() {
  try {
    Collection.findIconifyCollection('mdi')
    return true
  }
  catch (_) {
    return false
  }
}

const isIconifyJsonPresent = testIconifyJsonPresent()

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

async function lookupCollection(name: string): Promise<IconifyJSON> {
  const { icons } = await import(`@iconify-json/${name}`)
  return icons
}

export async function getIconSet(name: string) {
  if (!_iconSets[name])
    _iconSets[name] = await lookupCollection(name)

  return _iconSets[name]
}

export async function getBuiltinIcon(collection: string, icon: string): Promise<{
  iconData: any
  iconSet: boolean
} | null> {
  // fallback to old `@iconify/json`
  if (isIconifyJsonPresent) {
    const icons = getCollection(collection)
    if (!icons)
      return null

    let iconData: any
    for (const trans of _idTransforms) {
      iconData = icons.getIconData(trans(icon))
      if (iconData)
        return { iconData, iconSet: false }
    }
  }
  try {
    const iconSet = await getIconSet(collection)
    let iconData: FullIconifyIcon | null
    for (const trans of _idTransforms) {
      iconData = getIconData(iconSet, trans(icon), true)
      if (iconData)
        return { iconData, iconSet: true }
    }
  }
  catch (_) {}

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

  const data = await getBuiltinIcon(collection, icon)

  if (!data)
    return null

  const { iconData, iconSet } = data

  if (iconSet) {
    return iconToSVG(iconData, {
      ...DefaultIconCustomizations,
      height: `${scale}em`,
      width: `${scale}em`,
    }).body
  }
  else {
    const svg = new SVG(iconData)
    const svgText: string = svg.getSVG({
      height: `${scale}em`,
      width: `${scale}em`,
    })
    return svgText
  }
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
