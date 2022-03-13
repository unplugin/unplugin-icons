import type { Awaitable } from '@antfu/utils'
import type { ResolvedOptions } from '../../types'

export type Compiler = (
  svg: string,
  collection: string,
  icon: string,
  options: ResolvedOptions
) => string | Promise<string>

export interface CustomCompiler {
  compiler: Awaitable<Compiler>
  extension?: string
}
