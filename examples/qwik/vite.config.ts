import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import Icons from 'unplugin-icons/vite'

export default defineConfig(() => {
  return {
    
    plugins: [
      qwikVite(),
      Icons({ compiler: 'jsx', jsx: 'qwik' })
    ],
  };
});
