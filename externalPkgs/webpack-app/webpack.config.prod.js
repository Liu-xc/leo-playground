const commonConfig = require('./webpack.config.common');
const DuplicatePlugin = require('duplicate-package-checker-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  ...commonConfig,
  externals: ['react', 'react-dom', 'axios'],
  plugins: [new DuplicatePlugin()].concat(commonConfig.plugins),
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
};
