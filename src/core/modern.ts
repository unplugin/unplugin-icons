import { promises as fs } from 'fs'
import { IconifyJSON } from '@iconify/types'
import { iconToSVG } from '@iconify/utils/lib/svg/build'
import { defaults as DefaultIconCustomizations, FullIconCustomisations } from '@iconify/utils/lib/customisations'
import { getIconData } from '@iconify/utils/lib/icon-set/get-icon'
import createDebugger from 'debug'
import { FullIconifyIcon } from '@iconify/utils/lib/icon'
import { isPackageExists, resolveModule } from 'local-pkg'
import { ResolvedOptions } from '../types'
import { mergeIconProps, tryInstallPkg } from './utils'

const debug = createDebugger('unplugin-icons:icon')
const debugModern = createDebugger('unplugin-icons:modern')
const debugLegacy = createDebugger('unplugin-icons:legacy')

export interface ResolvedIconPath {
  collection: string
  icon: string
  query: Record<string, string | undefined>
}

const _collections: Record<string, Promise<IconifyJSON | undefined>> = {}
const isLegacyExists = isPackageExists('@iconify/json')

export async function loadCollection(name: string, autoInstall = false) {
  if (!_collections[name])
    _collections[name] = task()

  return _collections[name]

  async function task() {
    let jsonPath = resolveModule(`@iconify-json/${name}/icons.json`)
    if (jsonPath)
      debugModern(name)

    if (!jsonPath && isLegacyExists) {
      jsonPath = resolveModule(`@iconify/json/json/${name}.json`)
      if (jsonPath)
        debugLegacy(name)
    }

    if (!jsonPath && !isLegacyExists && autoInstall) {
      await tryInstallPkg(`@iconify-json/${name}`)
      jsonPath = resolveModule(`@iconify-json/${name}/icons.json`)
    }

    if (jsonPath) {
      return JSON.parse(await fs.readFile(jsonPath, 'utf8'))
    }
    else {
      debugModern(`failed to load ${name}`)
      return undefined
    }
  }
}

export async function searchForIcon(iconSet: IconifyJSON, collection: string, ids: string[], query: Record<string, string | undefined>, options?: ResolvedOptions) {
  let iconData: FullIconifyIcon | null
  for (const id of ids) {
    iconData = getIconData(iconSet, id, true)
    if (iconData) {
      debug(`${collection}:${id}`)
      const scale = options?.scale ?? 1
      const { attributes, body } = iconToSVG(iconData, {
        ...DefaultIconCustomizations,
        height: `${scale}em`,
        width: `${scale}em`,
      })
      return await mergeIconProps(
        `<svg>${body}</svg>`,
        collection,
        id,
        query,
        () => attributes,
        options,
      )
    }
  }
  return null
}
