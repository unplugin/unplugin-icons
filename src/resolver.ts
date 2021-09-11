// @ts-ignore
import Data from '@iconify/json'
import { getIcon } from './core/loader'

function camelToKebab(key: string) {
  const result = key
    .replace(/:/g, '-')
    .replace(/([A-Z])/g, ' $1')
    .trim()
  return result.split(/\s+/g).join('-').toLowerCase()
}

export interface ComponentResolverOption {
  /**
   * Prefix for resolving components name.
   * Set '' to disable prefix.
   *
   * @default 'i'
   */
  prefix?: string | false

  /**
   * Iconify collection names to that enable for resolving.
   *
   * @default [all collections]
   */
  enabledCollections?: string[]

  /**
   * Extension for the resolved id
   * Set `jsx` for JSX components
   *
   * @default ''
   */
  extension?: string

  /**
   * @deprecated renamed to `prefix`
   */
  componentPrefix?: string
}

/**
 * Resolver for unplugin-vue-components and unplugin-auto-import
 *
 * @param options
 */
export default function ComponentsResolver(options: ComponentResolverOption = {}) {
  const {
    prefix: rawPrefix = options.componentPrefix ?? 'i',
    enabledCollections = Object.keys(Data.collections()),
    extension,
  } = options

  const prefix = rawPrefix ? `${camelToKebab(rawPrefix)}-` : ''
  const ext = extension
    ? extension.startsWith('.')
      ? extension
      : `.${extension}`
    : ''

  // match longer name first
  enabledCollections.sort((a, b) => b.length - a.length)

  return (name: string) => {
    const kebab = camelToKebab(name)
    if (!kebab.startsWith(prefix))
      return

    const slice = kebab.slice(prefix.length)
    const collection = enabledCollections.find(i => slice.startsWith(`${i}-`)) || enabledCollections.find(i => slice.startsWith(i))
    if (!collection)
      return

    let icon = slice.slice(collection.length)
    if (icon[0] === '-')
      icon = icon.slice(1)

    if (!icon)
      return

    if (!getIcon(collection, icon))
      return

    return `~icons/${collection}/${icon}${ext}`
  }
}
