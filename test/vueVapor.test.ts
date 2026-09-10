import { expect, it } from 'vitest'
import { VueVaporCompiler } from '../src/core/compilers/vue-vapor'

const withGradient = `
<svg width="1.2em" height="1.2em" viewBox="0 0 256 257">
  <defs>
    <linearGradient x1="-.828%" y1="7.652%" x2="57.636%" y2="78.411%" id="ssvg-id-vitejsa">
      <stop stop-color="#41D1FF" offset="0%"></stop>
      <stop stop-color="#BD34FE" offset="100%"></stop>
    </linearGradient>
  </defs>
  <path d="M0 0h256v257H0z" fill="url(#ssvg-id-vitejsa)"></path>
</svg>
`

const withoutId = `
<svg width="1.2em" height="1.2em" viewBox="0 0 24 24">
  <path d="M0 0h24v24H0z" fill="currentColor"></path>
</svg>
`

it('emits a vapor component', async () => {
  const code = await VueVaporCompiler(withoutId, 'test', 'icon', {} as any)

  expect(code).toContain(`import { defineVaporComponent, markRaw } from 'vue'`)
  expect(code).toContain(`export default markRaw(defineVaporComponent({ name: 'test-icon', render }))`)
  // the render function has to stay local so the module can close over it
  expect(code).toContain('function render(')
  expect(code).not.toContain('export function render')
  expect(code).not.toContain('idMap')
  expect(code).not.toContain('__randId')
})

it('binds svg ids per render call', async () => {
  const code = await VueVaporCompiler(withGradient, 'test', 'icon', {} as any)

  // the id map is per instance, so it must live inside `render`, not at module scope
  expect(code.indexOf('const idMap = {')).toBeGreaterThan(code.indexOf('function render('))
  expect(code).toContain(`'ssvg-id-vitejsa':'uicons-'+__randId()`)
  // the map is a render local now, no longer read off the render context
  expect(code).not.toContain('_ctx.idMap')
  expect(code).toContain(`'url(#'+`)
})
