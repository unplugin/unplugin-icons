export async function RawCompiler(svg: string) {
  return `export default ${JSON.stringify(svg)}`
}
