import type { ServerPlugin } from 'vite'
import { ResolvedOptions } from './types'
import { generateComponentFromPath, isIconPath } from './loader'

export function createServerPlugin(options: ResolvedOptions): ServerPlugin {
  return ({ app }) => {
    app.use(async(ctx, next) => {
      if (isIconPath(ctx.path)) {
        const component = await generateComponentFromPath(ctx.path, options)
        if (component) {
          ctx.body = component
          ctx.type = 'js'
          ctx.status = 200
          return
        }
      }

      await next()
    })
  }
}
