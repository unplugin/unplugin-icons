import { existsSync, promises as fs } from 'fs'
import { Awaitable } from '@antfu/utils'
import { camelize, pascalize } from './core/utils'
import { CustomIconLoader } from '.'

export function FileSystemIconLoader(dir: string, transform?: (svg: string) => Awaitable<string | undefined>): CustomIconLoader {
  return async(name) => {
    const pathes = [
      `${dir}/${name}.svg`,
      `${dir}/${camelize(name)}.svg`,
      `${dir}/${pascalize(name)}.svg`,
    ]
    for (const path of pathes) {
      if (existsSync(path)) {
        return typeof transform === 'function'
          ? transform(await fs.readFile(path, 'utf-8'))
          : fs.readFile(path, 'utf-8')
      }
    }
  }
}
