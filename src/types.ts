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
   * @default [detect automatically]
   */
  compiler?: 'vue2' | 'vue3' | 'jsx'

  /**
   * JSX style, works only when compiler set to `jsx`
   *
   * @default 'react'
   */
  jsx?: 'react' | 'preact'
}

export type ResolvedOptions = Required<Options>
