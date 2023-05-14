const commonConfig = require('./webpack.config.common');

/** @type {import('webpack').Configuration} */
module.exports = {
  ...commonConfig,
  devServer: {
    port: 8080,
    hot: true,
    proxy: {
      '/list_api': {
        target: 'https://juejin.cn',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/list_api': '/list_api',
        },
      },
    },
  },
};
