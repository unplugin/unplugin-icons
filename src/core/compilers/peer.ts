import process from 'node:process'
import { pathToFileURL } from 'node:url'
import { importModule, resolveModule } from 'local-pkg'

/**
 * Import one of the optional peer dependencies used by a compiler.
 *
 * `importModule(name)` resolves the bare specifier from `local-pkg`'s own location, which only
 * works when the peer is hoisted next to it. Strict layouts (Bun's isolated linker with its global
 * store, pnpm without hoisting) link peers next to `unplugin-icons` instead, so resolve the module
 * from this package first and fall back to the user's project.
 */
export async function importPeerModule<T = any>(name: string): Promise<T> {
  const resolved = resolveModule(name, { paths: [import.meta.url, process.cwd()] })
  return await importModule(resolved ? pathToFileURL(resolved).href : name)
}
