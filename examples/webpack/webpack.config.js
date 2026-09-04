const { resolve } = require('node:path')
const {
  /** @type {import('unplugin-icons/loaders').FileSystemHMRIconLoader} */
  FileSystemHMRIconLoader,
} = require('unplugin-icons/loaders')
const Icons = require('unplugin-icons/webpack')

class HtmlPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('HtmlPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'HtmlPlugin',
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        () => {
          compilation.emitAsset(
            'index.html',
            new compiler.webpack.sources.RawSource(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webpack</title>
  </head>
  <body>
    <main id="app"></main>
    <script src="./main.js"></script>
  </body>
</html>
`),
          )
        },
      )
    })
  }
}

module.exports = {
  mode: 'development',
  entry: resolve(__dirname, 'src/main.js'),
  output: {
    path: resolve(__dirname, 'dist/webpack'),
    filename: 'main.js',
  },
  plugins: [
    new HtmlPlugin(),
    Icons({
      customCollections: {
        ...FileSystemHMRIconLoader('custom-a', 'custom'),
      },
    }),
  ],
}
