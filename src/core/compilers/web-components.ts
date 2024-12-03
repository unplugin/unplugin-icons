import type { Compiler } from './types'
import { camelize } from '@iconify/utils/lib/misc/strings'

export const WebComponentsCompiler = ((svg, collection, icon, { webComponents: options }) => {
  let id = `${collection}-${icon}`
  if (options.iconPrefix)
    id = `${options.iconPrefix}-${id}`

  const name = camelize(id)
  let code = `export default class ${name} extends HTMLElement {`
  if (options.shadow) {
    code += `constructor() {
      super()
      this.attachShadow({ mode: 'open' }).innerHTML = ${JSON.stringify(svg)}
    }`
  }
  else {
    // use connectedCallback because children can't be appended in the constructor of a CE:
    code += `connectedCallback() { this.innerHTML = ${JSON.stringify(svg)} }`
  }
  code += '}'

  if (options.autoDefine)
    code += `\ncustomElements.define('${id}', ${name})`

  return code
}) as Compiler
