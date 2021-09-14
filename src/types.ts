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
   * Compiler
   *
   * - none: plain SVG content
   * - raw: an ESM module with a default exported string of the SVG HTML
   *
   * @default (detect automatically, fallback to 'vue3')
   */
  compiler?: 'vue2' | 'vue3' | 'jsx' | 'solid' | 'svelte' | 'web-components' | 'none' | 'raw'

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
}

export type ResolvedOptions = Required<Options>
