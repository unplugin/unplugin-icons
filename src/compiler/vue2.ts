/* eslint-disable @typescript-eslint/no-var-requires */

// refer to: https://github.com/underfin/vite-plugin-vue2/blob/master/src/template/compileTemplate.ts
export function Vue2Compiler(svg: string, name: string, icon: string) {
  const { compile } = require('vue-template-compiler')
  const transpile = require('vue-template-es2015-compiler')
  const { render } = compile(svg)

  const toFunction = (code: string): string => {
    return `function () {${code}}`
  }

  // transpile code with vue-template-es2015-compiler, which is a forked
  // version of Buble that applies ES2015 transforms + stripping `with` usage
  let code = transpile(
    `var __render__ = ${toFunction(render as any)}\n`,
    {},
  )

  // we use __render__ to avoid `render` not being prefixed by the
  // transpiler when stripping with, but revert it back to `render` to
  // maintain backwards compat
  code = code.replace(/\s__(render|staticRenderFns)__\s/g, ' $1 ')

  code += `
/* vite-plugin-components disabled */
export default {
  render: render,
  name: '${name}-${icon}',
}
`

  return code
}
