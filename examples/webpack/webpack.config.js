/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')
const { fileURLToPath } = require('url')
const Icons = require('unplugin-icons/webpack')

module.exports = {
  mode: 'development',
  entry: resolve(__dirname, 'src/main.js'),
  output: {
    path: resolve(__dirname, 'dist/webpack'),
    filename: 'main.js',
  },
  plugins: [
    Icons(),
  ],
}
