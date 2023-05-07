import path from 'path';
import cleanPlugin from 'vite-plugin-clean';
import react from '@vitejs/plugin-react';
import analyzer from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';

/** @type {import('vite').UserConfig} */
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: '.',
    resolve: {
      alias: {
        '@utils': [path.resolve(__dirname, './src/utils')],
        '@styles': [path.resolve(__dirname, './src/styles')],
      },
    },
    plugins: [
      cleanPlugin({
        targetFiles: ['dist'],
      }),
      react(),
      String(env.ANALYZE) === 'true' ? analyzer({ open: true }) : null,
    ],
    css: {
      modules: {
        scopeBehaviour: 'local',
      },
    },
    build: {
      // sourcemap: true,
      // cssCodeSplit: false,
      cssMinify: true,
      watch: {
        include: ['./src', './vite.config.js'],
      },
      minify: false,
      rollupOptions: {
        external: ['lodash-es'],
        output: [
          {
            dir: './dist/esm',
            format: 'esm',
          },
          {
            dir: './dist/cjs',
            format: 'cjs',
          },
        ],
      },
    },
    server: {
      open: true,
      proxy: {
        '.*/vite': 'https://sponsors.vuejs.org',
      },
    },
  };
});
