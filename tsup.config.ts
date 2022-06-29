import type { Options } from 'tsup'
import { promises as fs } from 'fs'

export const tsup: Options = {
  splitting: true,
  clean: true,
  dts: true,
  entryPoints: ['src/*.ts'],
  esbuildPlugins: [
    {
      name: 'collectionsWriter',
      async setup(build) {
        const jc = `export const collections = ${JSON.stringify(Object.keys(
          JSON.parse(await fs.readFile('node_modules/@iconify/json/collections.json', 'utf8'))
        ))}`

        build.onLoad({ filter: /core[\/\\]collections\.ts/ }, async ({ path }) => {
          const code = await fs.readFile(path, 'utf8')
          return {
            contents: code.replace(/export const collections = \[.*\]/, jc),
            loader: 'ts',
          }
        })
      },
    },
  ],
  format: ['esm', 'cjs'],
  external: ['vue', '@iconify/json/package.json'],
}
