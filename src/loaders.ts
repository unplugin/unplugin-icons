import type { Awaitable } from '@antfu/utils'
import type { AutoInstall, ExternalPkgName } from '@iconify/utils/lib/loader/types'
import type { CustomHMRIconLoader, CustomIconLoader } from './types'
import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'
import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import { FileSystemIconLoader as IconifyFileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { camelize, pascalize, snakelize } from '@iconify/utils/lib/misc/strings'

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
  const normalizedDir = resolve(dir).replace(/\\/g, '/')
  const pathToName = new Map<string, string>()
  const nameToPath = new Map<string, string>()
  const customCollection: Record<string, CustomHMRIconLoader> = {}
  customCollection[collectionName] = {
    __unpluginIconsHmr: true,
    name: collectionName,
    iconLoader: async (name) => {
      return await resolveIcon(
        name,
        normalizedDir,
        pathToName,
        nameToPath,
        transform,
      )
    },
    handleHMREvent: (normalizedSVGPath) => {
      return pathToName.get(normalizedSVGPath)
    },
    resolveVirtualIconPath: name => nameToPath.get(name),
  }

  return customCollection
}

async function resolveIcon(
  name: string,
  normalizedDir: string,
  pathToName: Map<string, string>,
  nameToPath: Map<string, string>,
  transform?: (svg: string) => Awaitable<string>,
): Promise<string | undefined> {
  const candidates = [
    `${normalizedDir}/${name}.svg`,
    `${normalizedDir}/${camelize(name)}.svg`,
    `${normalizedDir}/${pascalize(name)}.svg`,
    `${normalizedDir}/${snakelize(name)}.svg`,
  ]

  for (const path of candidates) {
    let stat
    try {
      stat = await fs.lstat(path)
    }
    catch {
      continue
    }
    if (stat.isFile()) {
      pathToName.set(path, name)
      nameToPath.set(name, path)
      let svg = await fs.readFile(path, 'utf-8')
      const cleanupIdx = svg.indexOf('<svg')
      if (cleanupIdx > 0) {
        svg = svg.slice(cleanupIdx)
      }
      return typeof transform === 'function' ? await transform(svg) : svg
    }
  }
  return undefined
}
