import type { CustomHMRIconLoader } from '../types'

export async function collectHMRResolvers<T>(
  id: string,
  hmrCustomIconResolvers: CustomHMRIconLoader[],
  findModule: (id: string) => T | undefined,
): Promise<T[] | undefined> {
  if (!hmrCustomIconResolvers.length) {
    return undefined
  }

  const normalizedPath = id.replace(/\\/g, '/')

  for (const resolver of hmrCustomIconResolvers) {
    const icon = resolver.handleHMREvent(normalizedPath)
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
