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
   * @default (detect automatically, fallback to 'vue3')
   */
  compiler?: 'vue2' | 'vue3' | 'jsx' | 'solid' | 'svelte' | 'svelte-kit'

  /**
   * JSX style, works only when compiler set to `jsx`
   *
   * @default (detect automatically, fallback to 'react')
   */
  jsx?: 'react' | 'preact'

  /**
   * Svelte options, works only when compiler set to `svelte`.
   *
   * @see https://svelte.dev/docs#svelte_compile
   */
  svelte?: {
    /**
     * Module format
     *
     * @default 'esm'
     */
    format?: 'esm' | 'cjs'
    /**
     * Legacy mode?
     *
     * @default false
     */
    legacy?: boolean
    /**
     * Styles will be included in the JavaScript class and injected at runtime?
     *
     * @default true
     */
    css?: true
  }
}

export type ResolvedOptions = Required<Options>
