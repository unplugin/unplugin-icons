import type { Awaitable } from '@antfu/utils'
import { FileSystemIconLoader as IconifyFileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import type { CustomIconLoader } from '.'

export function FileSystemIconLoader(dir: string, transform?: (svg: string) => Awaitable<string>): CustomIconLoader {
  return IconifyFileSystemIconLoader(dir, transform)
}
