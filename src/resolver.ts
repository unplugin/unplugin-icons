// @ts-ignore
import Data from '@iconify/json'

function camelToKebab(key: string) {
  const result = key
    .replace(/:/g, '-')
    .replace(/([A-Z])/g, ' $1')
    .trim()
  return result.split(/\s+/g).join('-').toLowerCase()
}

export interface ComponentResolverOption {
  componentPrefix: string
  enabledCollections: string[]
}

/**
 * Resolver for vite-plugin-components
 *
 * @param options
 */
export function ViteIconsResolver(options: Partial<ComponentResolverOption> = {}) {
  const {
    componentPrefix = 'i',
    enabledCollections = Object.keys(Data.collections()),
  } = options

  const prefix = componentPrefix ? `${camelToKebab(componentPrefix)}-` : ''
  // match longer name first
  enabledCollections.sort((a,b)=> b.length - a.length)

  return (name: string) => {
    const kebab = camelToKebab(name)
    if (!kebab.startsWith(prefix))
      return

    const slice = kebab.slice(prefix.length)
    const collection = enabledCollections.find(i => slice.startsWith(`${i}-`))
    if (!collection)
      return

    const icon = slice.slice(collection.length + 1)
    if (!icon)
      return

    return `/@vite-icons/${collection}/${icon}.vue`
  }
}
