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
    outDir: path.resolve(__dirname, './dist'),
    rollupOptions: {
      input: path.resolve(__dirname, './src/contentjs/content.js'),
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
};
