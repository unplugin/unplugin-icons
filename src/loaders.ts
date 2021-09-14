import { existsSync, promises as fs } from 'fs'
import { camelize, pascalize } from './core/utils'
import { CustomIconLoader } from '.'

export function FileSystemIconLoader(dir: string): CustomIconLoader {
  return (name) => {
    const pathes = [
      `${dir}/${name}.svg`,
      `${dir}/${camelize(name)}.svg`,
      `${dir}/${pascalize(name)}.svg`,
    ]
    for (const path of pathes) {
      if (existsSync(path))
        return fs.readFile(path, 'utf-8')
    }
  }
}
