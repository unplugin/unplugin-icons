const { FileSystemHMRIconLoader } = require('unplugin-icons/loaders')
const plugin = require('unplugin-icons/webpack')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      (plugin.default || plugin)({
        compiler: 'jsx',
        jsx: 'react',
        customCollections: {
          ...FileSystemHMRIconLoader('custom-a', 'custom'),
        },
      }),
    )

    return config
  },
}
