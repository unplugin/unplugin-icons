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
   * @default 'vertical-align: middle; transform: translateY(-5%);'
   */
  defaultStyle?: string
}

export type ResolvedOptions = Required<Options>
