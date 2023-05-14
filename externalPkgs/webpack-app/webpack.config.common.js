const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index'),
  output: {
    clean: true,
    module: true,
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      scriptLoading: 'module',
    }),
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
    ],
  },
};
