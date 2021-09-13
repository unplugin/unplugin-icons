import { UserConfig } from 'vite'
import Icons from 'unplugin-icons/vite'

const config: UserConfig = {
  plugins: [
    Icons({
      compiler: 'raw',
    }),
  ],
}

export default config
