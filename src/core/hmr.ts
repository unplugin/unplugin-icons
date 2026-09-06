import type { CustomHMRIconLoader } from '@iconify/utils/lib/loader/types'
import { normalizePath } from '@iconify/utils/lib/loader/hmr-utils'

export function collectVirtualIconModuleNames<T>(
  id: string,
  hmrCustomIconResolvers: CustomHMRIconLoader[],
  findModule: (id: string) => T | undefined,
): T[] | undefined {
  if (!hmrCustomIconResolvers.length) {
    return undefined
  }

  const normalizedPath = normalizePath(id)

  for (const resolver of hmrCustomIconResolvers) {
    const icon = resolver.resolveModuleIconName(normalizedPath)
    if (icon) {
      return [
        `~icons/${resolver.name}/${icon}`,
        `virtual:icons/${resolver.name}/${icon}`,
        `virtual/icons/${resolver.name}/${icon}`,
      ].map(findModule).filter(Boolean) as T[]
    }
  }

  return undefined
}
