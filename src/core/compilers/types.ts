import { Awaitable } from '@antfu/utils'
import { ResolvedOptions } from '../../types'

export type Compiler = (
  svg: string,
  collection: string,
  icon: string,
  options: ResolvedOptions
) => string | Promise<string>

export type CustomCompiler = {
  compiler: Awaitable<Compiler>
  extension?: string
}
