import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import react from '@vitejs/plugin-react';

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
    react(),
  ],
  build: {
    watch: {
      include: ['./src/**', './manifest.json', './vite.config.js'],
    },
    sourcemap: true,
    rollupOptions: {
      preserveEntrySignatures: true,
      input: {
        'popup/index': path.resolve(__dirname, './src/popup/index.html'),
      },
      output: {
        entryFileNames: 'src/[name].js',
        assetFileNames: 'src/assets/[name].[ext]',
        dir: path.resolve(__dirname, './dist'),
      },
    },
  },
};
