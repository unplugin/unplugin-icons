import { installPackage } from '@antfu/install-pkg'
import { sleep } from '@antfu/utils'
import { cyan, yellow } from 'nanocolors'

export function camelize(str: string) {
  return str.replace(/-([a-z0-9])/g, g => g[1].toUpperCase())
}

export function pascalize(str: string) {
  const camel = camelize(str)
  return camel[0].toUpperCase() + camel.slice(1)
}

export function camelToKebab(key: string) {
  const result = key
    .replace(/:/g, '-')
    .replace(/([A-Z])/g, ' $1')
    .trim()
  return result.split(/\s+/g).join('-').toLowerCase()
}

const warnned = new Set<string>()

export function warnOnce(msg: string) {
  if (!warnned.has(msg)) {
    warnned.add(msg)
    console.warn(yellow(`[unplugin-icons] ${msg}`))
  }
}

let pending: Promise<void> | undefined
const tasks: Record<string, Promise<void> | undefined> = {}

export async function tryInstallPkg(name: string) {
  if (pending)
    await pending

  if (!tasks[name]) {
    // eslint-disable-next-line no-console
    console.log(cyan(`Installing ${name}...`))
    tasks[name] = pending = installPackage(name, { dev: true, preferOffline: true })
      .then(() => sleep(300))
      .catch((e) => {
        warnOnce(`Failed to install ${name}`)
        console.error(e)
      })
      .finally(() => {
        pending = undefined
      })
  }

  return tasks[name]!
}
