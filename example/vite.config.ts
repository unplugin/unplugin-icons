import { UserConfig } from 'vite'
import Icons from 'vite-plugin-icons'
import Components from 'vite-plugin-components'

const config: UserConfig = {
  plugins: [
    Components({

    }),
    Icons(),
  ],
}

export default config
