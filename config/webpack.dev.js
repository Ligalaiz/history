const { join } = require('path');
const { merge } = require('webpack-merge');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const COMMIT_HASH = require('child_process').execSync('git rev-parse --short HEAD').toString();
const PKG = require('../package.json');
const { paths, commonConfig } = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  name: 'client',
  devtool: 'inline-source-map',

  output: {
    path: join(paths.root, 'dist'),
    filename: '[name].[contenthash:10].js',
    chunkFilename: '[name].[contenthash:10].js',
    sourceMapFilename: '[name].[contenthash:10].map',
    assetModuleFilename: 'assets/[name].[contenthash:10].[ext]',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },

  devServer: {
    static: join(paths.root, 'dist'),
    hot: true,
    open: '/',
    port: 4000,
    historyApiFallback: true,
    // devMiddleware: {
    //   writeToDisk: true,
    // },
  },

  // plugins: [new BundleAnalyzerPlugin()],

  plugins: [
    new MiniCssExtractPlugin(),
    ...paths.html.map(
      (file) =>
        new HtmlWebpackPlugin({
          template: `${paths.pages}/${file.split('.')[0]}/${file}`,
          filename: `./${file}`,
          page: `${file}`,
          templateParameters: {
            title: `${file.split('.')[0]}`,
            buildTime: `Build at: ${new Date().toISOString()} `,
            commitHash: `Commit hash: ${COMMIT_HASH} `,
            version: `App version: ${JSON.stringify(PKG.version)} `,
          },
        }),
    ),

    new SpriteLoaderPlugin(),
  ],

  stats: {
    errorDetails: true,
  },
});
