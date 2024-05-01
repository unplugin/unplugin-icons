import type { Awaitable } from '@antfu/utils'
import { FileSystemIconLoader as IconifyFileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import type { AutoInstall, ExternalPkgName } from '@iconify/utils/lib/loader/types'
import type { CustomIconLoader } from '.'

export function FileSystemIconLoader(dir: string, transform?: (svg: string) => Awaitable<string>): CustomIconLoader {
  return IconifyFileSystemIconLoader(dir, transform)
}

export function ExternalPackageIconLoader(packageName: ExternalPkgName, autoInstall?: AutoInstall): Record<string, CustomIconLoader> {
  return createExternalPackageIconLoader(packageName, autoInstall)
}
