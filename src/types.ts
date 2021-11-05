import type { Awaitable } from '@antfu/utils'
import type { Compiler } from './core/compilers/types'

export type CustomIconLoader = (name: string) => Awaitable<string | undefined>
export type InlineCollection = Record<string, string | (() => Awaitable<string | undefined>)>
export type CustomCompiler = Compiler & {
  extension?: string
}

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
  compiler?: 'vue2' | 'vue3' | 'jsx' | 'solid' | 'svelte' | 'web-components' | 'marko' | 'none' | 'raw' | CustomCompiler

  /**
   * JSX style, works only when compiler set to `jsx`
   *
   * @default (detect automatically, fallback to 'react')
   */
  jsx?: 'react' | 'preact'

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
  }

  /**
   * @deprecated no longer needed
   */
  iconSource?: 'legacy' | 'modern' | 'auto'
}

export interface ResolvedOptions extends Omit<Required<Options>, 'iconSource'> {}
