import { promises as fs } from 'fs'
import fg from 'fast-glob'
import { Options } from './types'
import IconResolver, { ComponentResolverOptions } from './resolver'
import { pascalize } from './core/utils'
import unplugin from '.'

export interface Component {
  pascalName: string
  kebabName: string
  import: string
  asyncImport: string
  export: string
  filePath: string
  shortPath: string
  isAsync?: boolean
  chunkName: string
  level: number
  prefetch: boolean
  preload: boolean

  // await for https://github.com/nuxt/components/pull/234
  isAbsolute: boolean
}

function hyphenate(str: string): string {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

interface NuxtOptions extends Options {
  resolver?: ComponentResolverOptions
}

export default function(this: any, options: NuxtOptions) {
  // install webpack plugin
  this.extendBuild((config: any) => {
    config.plugins = config.plugins || []
    config.plugins.unshift(unplugin.webpack(options))
  })

  // install vite plugin
  this.nuxt.hook('vite:extend', async(vite: any) => {
    vite.config.plugins = vite.config.plugins || []
    vite.config.plugins.push(unplugin.vite(options))
  })

  if (this.nuxt.options.components === false)
    return

  // Auto import for components
  const resolver = IconResolver(options.resolver)
  this.nuxt.hook('components:extend', async(components: Component[]) => {
    const files = await fg(['**/*.vue'], {
      onlyFiles: true,
      cwd: this.options.rootDir,
      absolute: true,
      ignore: ['node_modules', '.git', 'dist', '.nuxt', '.output'],
    })

    const tags = new Set<string>()
    const tagRE = /<([a-zA-Z0-9-]+)\s/g

    await Promise.all(files.map(async(file) => {
      const content = await fs.readFile(file, 'utf-8')
      let m
      tagRE.lastIndex = 0
      do {
        m = tagRE.exec(content)
        if (m && m[1])
          tags.add(pascalize(m[1]))
      } while (m)
    }))

    Array.from(tags)
      .filter(tag => !components.find(i => i.pascalName === tag || i.kebabName === tag))
      .forEach((tag) => {
        const result = resolver(tag)
        if (result) {
          const kebabName = hyphenate(tag)
          components.push({
            pascalName: tag,
            kebabName,
            chunkName: `~icons/${kebabName}`,
            isAsync: false,
            import: `require('${result}').default`,
            filePath: result,
            shortPath: result,
            asyncImport: `function () { return import('${result}' /* webpackChunkName: "~icons/${kebabName}" */).then(function(m) { return m['default'] || m }) }`,
            export: 'default',
            level: 0,
            prefetch: false,
            preload: false,
            isAbsolute: true,
          })
        }
      })
  })
}
