import type { Awaitable } from '@antfu/utils'
import type { AutoInstall, ExternalPkgName } from '@iconify/utils/lib/loader/types'
import type { CustomIconLoader } from '.'
import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import { FileSystemIconLoader as IconifyFileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export function FileSystemIconLoader(dir: string, transform?: (svg: string) => Awaitable<string>): CustomIconLoader {
  return IconifyFileSystemIconLoader(dir, transform)
}

export function ExternalPackageIconLoader(packageName: ExternalPkgName, autoInstall?: AutoInstall): Record<string, CustomIconLoader> {
  return createExternalPackageIconLoader(packageName, autoInstall)
}
