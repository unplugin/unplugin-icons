import { existsSync, promises as fs } from 'fs'
import { Awaitable } from '@antfu/utils'
import { camelize, pascalize } from './core/utils'
import { CustomIconLoader } from '.'

export function FileSystemIconLoader(dir: string, transform?: (svg: string) => Awaitable<string>): CustomIconLoader {
  return async(name) => {
    const pathes = [
      `${dir}/${name}.svg`,
      `${dir}/${camelize(name)}.svg`,
      `${dir}/${pascalize(name)}.svg`,
    ]
    for (const path of pathes) {
      if (existsSync(path)) {
        const svg = await fs.readFile(path, 'utf-8')
        return typeof transform === 'function' ? await transform(svg) : svg
      }
    }
  }
}
