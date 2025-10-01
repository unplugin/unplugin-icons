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
          exp[pkg] = {
            types: `./types/${types}`,
          }
        }
      }
      exp['.'] = {
        import: {
          types: './dist/index.d.ts',
          default: './dist/index.js',
        },
        require: {
          types: './index.d.cts',
          default: './dist/index.cjs',
        },
      }
      exp['./resolver'] = {
        import: {
          types: './dist/resolver.d.ts',
          default: './dist/resolver.js',
        },
        require: {
          types: './resolver.d.cts',
          default: './dist/resolver.cjs',
        },
      }
      return exp
    },
  },
})

async function* getDtsTypesFiles() {
  const files = await fsPromises.readdir('./types/')
  for (const file of files) {
    if (file.endsWith('.d.ts') && file !== 'index.d.ts') {
      yield [`./${file.replace(/\.d\.ts$/, '')}`, file]
    }
  }
}
