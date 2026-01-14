import * as fsPromises from 'node:fs/promises'
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/*.ts'],
  format: ['esm'],
  external: ['vue', '@iconify/json/package.json'],
  fixedExtension: false,
  exports: {
    async customExports(exp) {
      // replace this for await with `import { glob } from 'node:fs/promises'
      // requires node v22.14.0+ => https://nodejs.org/api/fs.html
      for await (const [key, types] of getDtsTypesFiles()) {
        if (!exp[key]) {
          exp[key] = { types }
        }
      }
      return exp
    },
  },
})

async function* getDtsTypesFiles(): AsyncGenerator<[
  key: string,
  types: string,
], undefined, void> {
  const files = await fsPromises.readdir('./types/')
  for (const file of files) {
    if (file.endsWith('.d.ts') && file !== 'index.d.ts') {
      yield [`./types/${file.replace(/\.d\.ts$/, '')}`, `./types/${file}`] as const
    }
  }
}
