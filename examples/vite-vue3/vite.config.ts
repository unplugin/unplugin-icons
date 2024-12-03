import type { UserConfig } from 'vite'
import { cpSync, promises as fs } from 'node:fs'
import Vue from '@vitejs/plugin-vue'
import { ExternalPackageIconLoader, FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'

/************************************************************/
// DON'T DO THIS IN YOUR CODE: IT IS FOR TESTING PURPOSES ONLY
cpSync(
  './plain-color-icons',
  './node_modules/plain-color-icons',
  { recursive: true },
)
cpSync(
  './@test-scope',
  './node_modules/@test-scope',
  { recursive: true },
)
/************************************************************/

const config: UserConfig = {
  plugins: [
    Vue(),
    Icons({
      compiler: 'vue3',
      customCollections: {
        ...ExternalPackageIconLoader('@test-scope/test-color-icons'),
        ...ExternalPackageIconLoader('plain-color-icons'),
        custom: FileSystemIconLoader('assets/custom-a'),
        inline: {
          foo: `
<?xml version="1.0" standalone="no"?>
<svg width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100"><clipPath id="IconifyId-17be3d363e5-c8de42-104"><circle cx="50" cy="50" r="50"></circle></clipPath><g fill-rule="evenodd" clip-rule="evenodd" clip-path="url(#IconifyId-17be3d363e5-c8de42-104)"><circle fill="#316EAC" cx="50" cy="50" r="50"></circle><path fill="#fff" d="M14.084 107.072a2 2 0 0 1-2-1.977L12.023 100H7a2 2 0 0 1-2-2V78c0-.323.078-.642.229-.928l11-21c.16-.306.396-.564.685-.751l16.375-10.596L40.08 21.44a2 2 0 0 1 1.617-1.417L42 20a2 2 0 0 1 1.664.891l5.62 8.429l5.349 1.783c.452.151.837.459 1.082.869l13.971 23.285l8.285-4.971a1.997 1.997 0 0 1 2.629.514l12 16c.083.11.154.229.213.354l7 15a2.002 2.002 0 0 1-.599 2.436l-28.916 22.072c-.349.266-.775.41-1.214.41h-55z"></path><path fill="#fff" d="M69.084 105.073h-55L14 98H7V78l11-21l17-11l7-24l6 9l6 2l15 25l10-6l12 16l7 15l-28.916 22.073z"></path><path fill="#6BC8F2" d="M8 108a2 2 0 0 1-2-2V76a2 2 0 0 1 .211-.895l10-20a1.99 1.99 0 0 1 .703-.784l16.328-10.565l5.813-24.222A2 2 0 0 1 41 18h.039a2 2 0 0 1 1.923 1.607l3 15c.038.196.048.395.028.593l-1 10a2.012 2.012 0 0 1-.111.484l-4 11l-4.81 13.468l2.891 14.456c.068.342.046.695-.063 1.025L35 97.324V106a2 2 0 0 1-2 2H8zm62.998-25c-.337 0-.678-.085-.99-.264l-7-4a2.001 2.001 0 0 1-.924-2.311l6-20c.15-.5.489-.921.944-1.174l9-5a2.014 2.014 0 0 1 1.987.025c.61.36.985 1.015.985 1.724v17c0 .395-.117.781-.336 1.109l-8 12a2 2 0 0 1-1.666.891z"></path><path fill="#6BC8F2" d="M70 57l-6 20l7 4l8-12V52l-9 5zM35 45L18 56L8 76v30h25v-9l4-12l-3-15l5-14l4-11l1-10l-3-15l-6 25z"></path><circle opacity=".2" fill="#fff" cx="76.5" cy="29.5" r="1.5"></circle><circle opacity=".1" fill="#fff" cx="14.5" cy="40.5" r="1.5"></circle><circle opacity=".43" fill="#fff" cx="56.5" cy="15.5" r="1.5"></circle></g></svg>
`,
          async: () => fs.readFile('assets/giftbox.svg', 'utf-8'),
        },
      },
      iconCustomizer(collection, icon, props) {
        const name = `${collection}:${icon}`
        if (name === 'inline:async' || name === 'carbon:app-connectivity' || name === 'custom:car-a') {
          props.width = '3em'
          props.height = '3em'
          props.color = 'skyblue'
        }
      },
    }),
    Components({
      dts: true,
      resolvers: [
        IconsResolver({
          alias: {
            park: 'icon-park',
          },
          customCollections: [
            'custom',
            'inline',
            // custom external packages
            'plain-color-icons',
            'test-color-icons',
          ],
        }),
      ],
    }),
  ],
}

export default config
