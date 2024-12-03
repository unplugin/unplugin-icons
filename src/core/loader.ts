import type { IconifyLoaderOptions } from '@iconify/utils'
import type { ResolvedOptions } from '../types'
import type { Compiler } from './compilers/types'
import { loadNodeIcon } from '@iconify/utils/lib/loader/node-loader'
import { compilers } from './compilers'

const URL_PREFIXES = ['/~icons/', '~icons/', 'virtual:icons/', 'virtual/icons/']
const iconPathRE = new RegExp(`${URL_PREFIXES.map(v => `^${v}`).join('|')}`)

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
        await providedIconCustomizer?.(collection, icon, props)
        Object.keys(query).forEach((p) => {
          const v = query[p]
          // exclude raw compiler entry to be serialized as svg attr
          if (p !== 'raw' && v !== undefined && v !== null)
            props[p] = v
        })
      },
    },
  }
  const svg = await loadNodeIcon(collection, icon, iconifyLoaderOptions)
  if (!svg)
    throw new Error(`Icon \`${warn}\` not found`)

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
