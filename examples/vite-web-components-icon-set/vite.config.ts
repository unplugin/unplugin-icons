import { UserConfig } from 'vite'
import Icons from 'unplugin-icons/vite'

const config: UserConfig = {
  plugins: [
    Icons({
      compiler: 'web-components',
      webComponents: {
        autoDefine: true,
      },
    }),
  ],
}

export default config
