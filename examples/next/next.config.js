const plugin = require('unplugin-icons/webpack')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      (plugin.default || plugin)({
        compiler: 'jsx',
        jsx: 'react',
      }),
    )

    return config
  },
}
