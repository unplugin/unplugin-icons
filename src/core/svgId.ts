const randIdFn = 'const __randId = () => Math.random().toString(36).substr(2, 10);'

const RE_HAS_ID = /="url\(#/
const RE_URL_ID = /\b([\w-]+)="url\(#(.+?)\)"/g
const RE_ID_ATTR = /\bid="(.+?)"/g

export function handleSVGId(svg: string) {
  const hasID = RE_HAS_ID.test(svg)
  const idMap: Record<string, string> = {}
  let injectScripts = ''

  if (hasID) {
    svg = svg
      .replace(RE_URL_ID, (_, s, id) => {
        idMap[id] = `'${id}':'uicons-'+__randId()`
        return `:${s}="'url(#'+idMap['${id}']+')'"`
      })
      .replace(RE_ID_ATTR, (full, id) => {
        if (idMap[id])
          return `:id="idMap['${id}']"`
        return full
      })
    injectScripts = `${randIdFn}const idMap = {${Object.values(idMap).join(',')}};`
  }

  return {
    hasID,
    svg,
    injectScripts,
  }
}
