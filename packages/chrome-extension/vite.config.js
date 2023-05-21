import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

/** @type import('vite').UserConfig */
export default {
  root: path.resolve(__dirname, '.'),
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, './manifest.json'),
          dest: path.resolve(__dirname, './dist'),
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      preserveEntrySignatures: true,
      input: {
        content: path.resolve(__dirname, './src/contentjs/content.ts'),
        service: path.resolve(__dirname, './src/servicejs/service.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        dir: path.resolve(__dirname, './dist'),
        preserveModules: true,
      },
    },
    // {
    //   input: path.resolve(__dirname, './src/servicejs/service.ts'),
    //   output: {
    //     entryFileNames: '[name].js',
    //     dir: path.resolve(__dirname, './dist/service_scripts'),
    //   },
    // },
  },
};
