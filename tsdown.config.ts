import * as fsPromises from 'node:fs/promises'
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/*.ts'],
  format: ['esm', 'cjs'],
  external: ['vue', '@iconify/json/package.json'],
  exports: {
    async customExports(exp) {
      for await (const [pkg, types] of getDtsTypesFiles()) {
        if (!exp[pkg]) {
          exp[pkg] = { types }
        }
      }
      return exp
    },
  },
  hooks: {
    'build:done': async () => {
      await patchNode16CJSDefaultExports([
        'index',
        'resolver',
      ])
    },
  },
})

async function patchNode16CJSDefaultExports(
  files: string[],
) {
  await Promise.all(files.map(async (file) => {
    const path = `./dist/${file}.d.cts`
    const content = await fsPromises.readFile(path, { encoding: 'utf8' })
    const fixedContent = content.match(/export\s+\{(.*)\};/)
    if (fixedContent && fixedContent.length > 0) {
      const exports = fixedContent[1].split(',').map(e => e.trim()).filter(e => e.includes(' as default'))
      if (exports.length === 1) {
        await fsPromises.writeFile(
          path,
          content.replace(fixedContent[0], `export = ${exports[0].replace(' as default', '').trim()};`),
          { encoding: 'utf8' },
        )
      }
    }
  }))
}

async function* getDtsTypesFiles() {
  const files = await fsPromises.readdir('./types/')
  for (const file of files) {
    if (file.endsWith('.d.ts') && file !== 'index.d.ts') {
      yield [`./types/${file.replace(/\.d\.ts$/, '')}`, `./types/${file}`]
    }
  }
}
