import { existsSync, promises as fs } from 'fs'
import type { Awaitable } from '@antfu/utils'
import { camelize, pascalize, snakelize } from "./core/utils"
import type { CustomIconLoader } from '.'

export function FileSystemIconLoader(dir: string, transform?: (svg: string) => Awaitable<string>): CustomIconLoader {
  return async(name) => {
    const pathes = [
      `${dir}/${name}.svg`,
      `${dir}/${camelize(name)}.svg`,
      `${dir}/${pascalize(name)}.svg`,
      `${dir}/${snakelize(name)}.svg`,
    ]
    for (const path of pathes) {
      if (existsSync(path)) {
        const svg = await fs.readFile(path, 'utf-8')
        return typeof transform === 'function' ? await transform(svg) : svg
      }
    }
  }
}
