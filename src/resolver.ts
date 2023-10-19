import { toArray, uniq } from '@antfu/utils'
import { camelToKebab } from '@iconify/utils/lib/misc/strings'
import { collections as allCollections } from './core/collections'

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
  enabledCollections?: string | string[]

  /**
   * Icon collections aliases.
   *
   * The `aliases` keys are the `alias` and the values are the `name` for the collection.
   *
   * Instead using `<i-icon-park-abnormal />` we can use `<i-park-abnormal />` configuring:
   * `alias: { park: 'icon-park' }`
   */
  alias?: Record<string, string>

  /**
   * Name for custom collections provide by loaders.
   */
  customCollections?: string | string[]

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
    enabledCollections = allCollections,
    alias = {},
    customCollections = [],
    extension,
  } = options

  const prefix = rawPrefix ? `${camelToKebab(rawPrefix)}-` : ''
  const ext = extension
    ? extension.startsWith('.')
      ? extension
      : `.${extension}`
    : ''
  const collections = uniq([
    ...toArray(enabledCollections),
    ...toArray(customCollections),
    ...toArray(Object.keys(alias)),
  ])

  // match longer name first
  collections.sort((a, b) => b.length - a.length)

  return (name: string) => {
    let collection: string
    let icon: string
    if (name.includes(':')) {
      const [iconPrefix, iconSuffix] = name.split(':')
      collection = camelToKebab(iconPrefix)
      if (!collection.startsWith(prefix))
        return

      const slice = collection.slice(prefix.length)
      const resolvedCollection = collections.find(i => slice.startsWith(`${i}-`)) || collections.find(i => slice.startsWith(i))
      if (!resolvedCollection)
        return

      collection = resolvedCollection

      icon = camelToKebab(iconSuffix)
      if (icon[0] === '-')
        icon = icon.slice(1)
    }
    else {
      const kebab = camelToKebab(name)
      if (!kebab.startsWith(prefix))
        return

      const slice = kebab.slice(prefix.length)
      const resolvedCollection = collections.find(i => slice.startsWith(`${i}-`)) || collections.find(i => slice.startsWith(i))
      if (!resolvedCollection)
        return

      collection = resolvedCollection
      icon = slice.slice(resolvedCollection.length)
      if (icon[0] === '-')
        icon = icon.slice(1)
    }

    if (!icon)
      return

    const resolvedCollection = alias[collection] || collection

    if (collections.includes(resolvedCollection))
      return `~icons/${resolvedCollection}/${icon}${ext}`
  }
}
