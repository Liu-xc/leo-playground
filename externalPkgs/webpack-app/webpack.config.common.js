const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const LeoPlugin = require('./webpack/plugins');

module.exports = {
  entry: path.resolve(__dirname, './src/index2'),
  output: {
    clean: true,
    module: true,
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      scriptLoading: 'module',
    }),
    new LeoPlugin()
  ],
  target: ['web'],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.less'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                targets: {
                  chrome: "58",
                  ie: "10"
                }
              },
            ],
            '@babel/preset-react',
          ],
        },
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less?$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'less-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg)$/,
        loader: 'url-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x)?$/,
        loader: './webpack/loaders.js'
      }
    ],
  },
  optimization: {
    // minimize: true,
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        dynamicImports: {
          test (module) {
            return /(asyncChunk|dynamicChunk)/.test(module.resource || '');
          },
          chunks: 'all',
          name: 'dynamicImports',
        },
      },
    },
  },
};
