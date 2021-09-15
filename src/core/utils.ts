export function camelize(str: string) {
  return str.replace(/-([a-z0-9])/g, g => g[1].toUpperCase())
}

export function pascalize(str: string) {
  const camel = camelize(str)
  return camel[0].toUpperCase() + camel.slice(1)
}

export function camelToKebab(key: string) {
  const result = key
    .replace(/:/g, '-')
    .replace(/([A-Z])/g, ' $1')
    .trim()
  return result.split(/\s+/g).join('-').toLowerCase()
}

// escape curlies, backtick, \t, \r, \n to avoid breaking output of {@html `here`} in .svelte
export function escapeSvelte(str: string): string {
  return str
    .replace(/{/g, '&#123;')
    .replace(/}/g, '&#125;')
    .replace(/`/g, '&#96;')
    .replace(/\\([trn])/g, ' ')
}
