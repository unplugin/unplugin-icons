import type { CustomCollectionIconLoader, CustomHMRIconLoader } from '../types'

export function isCustomHMRIconLoader(loader: CustomCollectionIconLoader): loader is CustomHMRIconLoader {
  return typeof loader === 'function'
    ? false
    : (
        '__unpluginIconsHmr' in loader && loader.__unpluginIconsHmr === true
        && 'name' in loader && typeof loader.name === 'string'
        && 'iconLoader' in loader && typeof loader.iconLoader === 'function'
        && 'handleHMREvent' in loader && typeof loader.handleHMREvent === 'function'
        && 'resolveVirtualIconPath' in loader && typeof loader.resolveVirtualIconPath === 'function'
      )
}

export function collectVirtualIconModuleNames<T>(
  id: string,
  hmrCustomIconResolvers: CustomHMRIconLoader[],
  findModule: (id: string) => T | undefined,
): T[] | undefined {
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
