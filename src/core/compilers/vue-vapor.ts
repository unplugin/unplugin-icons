import type { Compiler } from './types'
import { importModule } from 'local-pkg'
import { handleSVGId } from '../svgId'

const renderFnRE = /^(?:export )?function render\((\w+)\)\s*\{/m

export const VueVaporCompiler = (async (svg: string, collection: string, icon: string) => {
  const { compile } = await importModule('@vue/compiler-vapor')

  const name = `${collection}-${icon}`
  const { injectScripts, svg: handled } = handleSVGId(svg)

  let { code } = compile(handled, {
    filename: `${name}.vue`,
    prefixIdentifiers: true,
  })

  if (injectScripts) {
    // `idMap` has to be built inside `render`, not at module scope: module scope is
    // shared by every instance of the icon, which is the collision it exists to avoid.
    const match = code.match(renderFnRE)
    if (!match)
      throw new Error(`Unable to inject SVG id bindings into the Vapor render function of \`${name}\``)
    // `match[1]` is the render context identifier (`_ctx`). Rewriting the references
    // has to happen before the insert, or the injected `const idMap` gets rewritten too.
    code = code
      .replaceAll(`${match[1]}.idMap`, 'idMap')
      .replace(match[0], `${match[0]}\n  ${injectScripts}`)
  }

  // dropping `export` lets the module below close over `render` and export the component instead
  code = `import { defineVaporComponent, markRaw } from 'vue'\n${code.replace(/^export /gm, '')}`
  code += `\n\nexport default markRaw(defineVaporComponent({ name: '${name}', render }))`
  code += '\n/* vite-plugin-components disabled */'

  return code
}) as Compiler
