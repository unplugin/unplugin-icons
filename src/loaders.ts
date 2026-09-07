import type { Awaitable } from '@antfu/utils'
import type {
  AutoInstall,
  CustomHMRIconLoader,
  ExternalPkgName,
} from '@iconify/utils/lib/loader/types'
import type { CustomIconLoader } from '.'
import {
  createExternalPackageIconLoader,
} from '@iconify/utils/lib/loader/external-pkg'
import {
  FileSystemHMRIconLoader as IconifyFileSystemHMRIconLoader,
  FileSystemIconLoader as IconifyFileSystemIconLoader,
} from '@iconify/utils/lib/loader/node-loaders'

export function FileSystemIconLoader(dir: string, transform?: (svg: string) => Awaitable<string>): CustomIconLoader {
  return typeof transform === 'function'
    ? IconifyFileSystemIconLoader(dir, async (svg) => {
        return await transform(svg)
      })
    : IconifyFileSystemIconLoader(dir)
}

export function ExternalPackageIconLoader(packageName: ExternalPkgName, autoInstall?: AutoInstall): Record<string, CustomIconLoader> {
  return createExternalPackageIconLoader(packageName, autoInstall)
}

export function FileSystemHMRIconLoader(
  dir: string,
  collectionName: string,
  transform?: (svg: string) => Awaitable<string>,
): Record<string, CustomHMRIconLoader> {
  return typeof transform === 'function'
    ? IconifyFileSystemHMRIconLoader(dir, collectionName, async (svg) => {
        return await transform(svg)
      })
    : IconifyFileSystemHMRIconLoader(dir, collectionName)
}
