import type { Awaitable } from '@antfu/utils'
import type { CustomCompiler } from './core/compilers/types'

export type CustomIconLoader = (name: string) => Awaitable<string | undefined>
export type IconCustomizer = (collection: string, icon: string, props: Record<string, string>) => Awaitable<void>
export type InlineCollection = Record<string, string | (() => Awaitable<string | undefined>)>
export type { CustomCompiler }

export interface Options {
  /**
   * Scale of icons against 1em
   *
   * @default 1.2
   */
  scale?: number

  /**
   * Style apply to icons by default
   *
   * @default ''
   */
  defaultStyle?: string

  /**
   * Class names apply to icons by default
   *
   * @default ''
   */
  defaultClass?: string

  /**
   * Loader for custom loaders
   */
  customCollections?: Record<string, CustomIconLoader | InlineCollection>

  /**
   * Icon customizer
   */
  iconCustomizer?: IconCustomizer

  /**
   * Current working directory for resolving collections from node_modules
   */
  collectionsNodeResolvePath?: string | string[]

  /**
   * Transform raw `svg`.
   *
   * **WARNING**: `transform` will be only applied when using `custom` icon collection.
   *
   * @param svg The loaded `svg`
   * @param collection The name of the collection
   * @param icon The name of the icon
   * @return The transformed `svg`.
   */
  transform?: (svg: string, collection: string, icon: string) => Awaitable<string>

  /**
   * Auto install icon sources package when the usages is detected
   *
   * @default false
   */
  autoInstall?: boolean

  /**
   * Compiler
   *
   * - none: plain SVG content
   * - raw: an ESM module with a default exported string of the SVG HTML
   *
   * @default (detect automatically, fallback to 'vue3')
   */
  compiler?: 'astro' | 'ember' | 'jsx' | 'marko' | 'none' | 'solid' | 'svelte' | 'raw' | 'vue2' | 'vue3' | 'web-components' | 'qwik' | CustomCompiler

  /**
   * JSX style, works only when compiler set to `jsx`
   *
   * @default (detect automatically, fallback to 'react')
   */
  jsx?: 'react' | 'preact' | 'qwik'

  /**
   * Config for Web Components compiler
   */
  webComponents?: {
    /**
     * Call `customElements.define` automatically on module importing
     */
    autoDefine?: boolean

    /**
     * Prefix for auto defining
     *
     * @default 'icon'
     */
    iconPrefix?: string

    /**
     * Use shadow DOM
     * @default false
     */
    shadow?: boolean
  }

  /**
   * @deprecated no longer needed
   */
  iconSource?: 'legacy' | 'modern' | 'auto'

  /**
   * HMR helper to resolve the icon id from local file SVG changes.
   *
   * **NOTE:** works only with Vite.
   *
   * Since there is no way to correlate the icon name with the local file SVG, we need a helper to invalidate the
   * corresponding icon module.
   *
   * For example, we can have a custom collection using `readFile`, we cannot resolve `~icons/inline/async`
   * when `<project-root>/assets/giftbox.svg` changes:
   * ```ts
   * customCollections: {
   *   inline: {
   *     async: () => fs.readFile('assets/giftbox.svg', 'utf-8')
   *   }
   * }
   * ```
   *
   * To resolve the icon in the previous example you will need to add:
   * ```ts
   * hmrResolver(file) => file.endsWidth('assets/giftbox.svg') ? 'inline/async' : undefined
   * ```
   *
   * The `normalizedSVGIconName` is the SVG basename without the extension converted to kebab-case, will help you when using `FileSystemIconLoader`:
   * ```ts
   * customCollections: {
   *   custom: FileSystemIconLoader('assets/custom-a')
   * }
   * ```
   *
   * then, to resolve the icons from the `assets/custom-a` folder you only need to add the corresponding collection name:
   * To resolve the icon in the previous example you will need to add:
   * ```ts
   * hmrResolver(file, folderName, normalizedSVGIconName) {
   *   if (folderName.endsWith('assets/custom-a') {
   *     return `custom/${normalizedSVGIconName}`
   *   }
   * }
   * ```
   *
   * @param file The file path received from the Vite's [handleHotUpdate](https://vite.dev/guide/api-plugin.html#handlehotupdate) hook.
   * @param folderName The normalized folder containing the file.
   * @param normalizedSVGIconName The normalized SVG name (basename without extension and the path).
   * @return The icon collection and name to invalidate (<collection>/<icon>).
   * @see https://vitejs.dev/guide/api-plugin.html#handlehotupdate
   */
  hmrResolver?: (file: string, folderName: string, normalizedSVGIconName: string) => Awaitable<string | string[] | undefined>
}

export type ResolvedOptions = Omit<Required<Options>, 'iconSource' | 'transform' | 'hmrResolver'> & Pick<Options, 'transform' | 'hmrResolver'>
