import type { Options } from 'tsup'

export const tsup: Options = {
  splitting: true,
  clean: true,
  dts: true,
  entryPoints: [
    'src/*.ts',
  ],
  format: [
    'esm',
    'cjs',
  ],
  external: [
    'vue',
    '@iconify/json/package.json',
  ],
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.mjs',
    }
  },
}
