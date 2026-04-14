import type { IconifyLoaderOptions } from '@iconify/utils'
import type { ResolvedOptions } from '../types'
import type { Compiler } from './compilers/types'
import { loadNodeIcon } from '@iconify/utils/lib/loader/node-loader'
import { compilers } from './compilers'

const URL_PREFIXES = ['/~icons/', '~icons/', 'virtual:icons/', 'virtual/icons/']
const iconPathRE = new RegExp(`${URL_PREFIXES.map(v => `^${v}`).join('|')}`)
const DIMENSION_SUPPRESSION_KEYWORDS = new Set(['none', 'unset'])

export interface ResolvedIconPath {
  collection: string
  icon: string
  query: Record<string, string | undefined>
}

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
      // configure raw compiler for empty and true values only
      if (key === 'raw')
        query.raw = (value === '' || value === 'true') ? 'true' : 'false'
      else
        query[key] = value
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

export async function generateComponent({ collection, icon, query }: ResolvedIconPath, options: ResolvedOptions) {
  const warn = `${collection}/${icon}`
  const {
    scale,
    defaultStyle,
    defaultClass,
    customCollections,
    iconCustomizer: providedIconCustomizer,
    transform,
    autoInstall = false,
    collectionsNodeResolvePath,
  } = options
  const dimensionOverrides = createDimensionOverrideTracker()

  const iconifyLoaderOptions: IconifyLoaderOptions = {
    addXmlNs: false,
    scale,
    customCollections,
    autoInstall,
    defaultClass,
    defaultStyle,
    cwd: collectionsNodeResolvePath,
    // there is no need to warn since we throw an error below
    warn: undefined,
    customizations: {
      transform,
      async iconCustomizer(collection, icon, props) {
        const trackedProps = dimensionOverrides.track(props)
        await providedIconCustomizer?.(collection, icon, trackedProps)
        Object.keys(query).forEach((p) => {
          const v = query[p]
          // exclude raw compiler entry to be serialized as svg attr
          if (p !== 'raw' && v !== undefined && v !== null)
            trackedProps[p] = v
        })
      },
    },
  }
  let svg = await loadNodeIcon(collection, icon, iconifyLoaderOptions)
  if (!svg)
    throw new Error(`Icon \`${warn}\` not found`)
  svg = stripRootSvgDimensions(svg, dimensionOverrides.explicit)

  // accept raw compiler from query params
  const _compiler = query.raw === 'true' ? 'raw' : options.compiler

  if (_compiler) {
    const compiler = typeof _compiler === 'string'
      ? compilers[_compiler]
      : (await _compiler.compiler) as Compiler

    if (compiler)
      return compiler(svg, collection, icon, options)
  }

  throw new Error(`Unknown compiler: ${_compiler}`)
}

export async function generateComponentFromPath(path: string, options: ResolvedOptions) {
  const resolved = resolveIconsPath(path)
  if (!resolved)
    return null
  return generateComponent(resolved, options)
}

interface ExplicitDimensionOverrides {
  width?: string
  height?: string
}

function createDimensionOverrideTracker() {
  const explicit: ExplicitDimensionOverrides = {}

  return {
    explicit,
    track(props: Record<string, string>) {
      return new Proxy(props, {
        set(target, property, value) {
          if (typeof property === 'string') {
            if (property === 'width' || property === 'height')
              explicit[property] = String(value)
            target[property] = String(value)
            return true
          }
          Reflect.set(target, property, value)
          return true
        },
      })
    },
  }
}

function stripRootSvgDimensions(svg: string, explicit: ExplicitDimensionOverrides) {
  const explicitWidth = explicit.width
  const explicitHeight = explicit.height
  const suppressWidth = isSuppressedDimension(explicitWidth)
  const suppressHeight = isSuppressedDimension(explicitHeight)

  if (!suppressWidth && !suppressHeight)
    return svg

  const removeWidth = suppressWidth
    || (suppressHeight && explicitWidth === undefined)
  const removeHeight = suppressHeight
    || (suppressWidth && explicitHeight === undefined)

  return svg.replace(/<svg\b([^>]*)>/, (full, attrs) => {
    let nextAttrs = attrs as string

    if (removeWidth)
      nextAttrs = nextAttrs.replace(/\swidth=(['"]).*?\1/, '')

    if (removeHeight)
      nextAttrs = nextAttrs.replace(/\sheight=(['"]).*?\1/, '')

    return `<svg${nextAttrs}>`
  })
}

function isSuppressedDimension(value?: string) {
  return value != null && DIMENSION_SUPPRESSION_KEYWORDS.has(value.toLowerCase())
}
