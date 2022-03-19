import { camelize } from '@iconify/utils/lib/misc/strings'
import type { Compiler } from './types'

export const WebComponentsCompiler = <Compiler>((svg, collection, icon, { webComponents: options }) => {
  let id = `${collection}-${icon}`
  if (options.iconPrefix)
    id = `${options.iconPrefix}-${id}`

  const name = camelize(id)
  return `
export default class ${name} extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = ${JSON.stringify(svg)}
  }
}
${options.autoDefine ? `customElements.define('${id}', ${name})` : ''}
`
})
