const { join } = require('path');
const { merge } = require('webpack-merge');
const { extendDefaultPlugins } = require('svgo');

const ESLintPlugin = require('eslint-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { paths, commonConfig } = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'production',
  name: 'client',
  target: 'browserslist',

  output: {
    path: join(paths.root, 'dist'),
    filename: '[name].[chunkhash:10].js',
    chunkFilename: '[name].[chunkhash:10].js',
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },

  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              [
                'svgo',
                {
                  plugins: extendDefaultPlugins([
                    {
                      name: 'removeViewBox',
                      active: false,
                    },
                    {
                      name: 'addAttributesToSVGElement',
                      params: {
                        attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                      },
                    },
                  ]),
                },
              ],
            ],
          },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        styles: {
          name: 'main',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:10].css',
      chunkFilename: 'styles/[name].[contenthash:10].css',
    }),
    new ESLintPlugin({
      extensions: ['js'],
      fix: false,
      failOnError: true,
    }),
    ...paths.html.map(
      (file) =>
        new HtmlWebpackPlugin({
          template: `${paths.pages}/${file.split('.')[0]}/${file}`,
          filename: `./${file}`,
          templateParameters: {
            title: `${file.split('.')[0]}`,
            buildTime: '',
            commitHash: '',
            version: '',
          },
        }),
    ),
  ],
});
