import type { ServerPlugin } from 'vite'
import { Options } from './types'
import { generateComponentFromPath, isIconPath } from './loader'

export function createServerPlugin(options: Options): ServerPlugin {
  return ({ app }) => {
    app.use(async(ctx, next) => {
      if (isIconPath(ctx.path)) {
        const component = await generateComponentFromPath(ctx.path)
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
