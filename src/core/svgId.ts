const randIdFn = 'const __randId = () => Math.random().toString(36).substr(2, 10);'

export function handleSVGId(svg: string) {
  const hasID = /="url\(#/.test(svg)
  const idMap: Record<string, string> = {}
  let injectScripts = ''

  if (hasID) {
    svg = svg
      .replace(/\b([\w-]+)="url\(#(.+?)\)"/g, (_, s, id) => {
        idMap[id] = `'${id}':'uicons-'+__randId()`
        return `:${s}="'url(#'+idMap['${id}']+')'"`
      })
      .replace(/\bid="(.+?)"/g, (full, id) => {
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
