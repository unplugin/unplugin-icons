import { expect, it } from 'vitest'
import { Vue3Compiler } from '../src/core/compilers/vue3'

const fixture = '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>'

it('vue3 compiler resolves @vue/compiler-sfc from this package', async () => {
  const code = await Vue3Compiler(fixture, 'mdi', 'square', {} as any)
  expect(code).toContain('import { markRaw } from \'vue\'')
  expect(code).toContain('export default markRaw({ name: \'mdi-square\', render })')
})
