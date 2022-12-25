const { join } = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

const getFiles = (type) =>
  fs
    .readdirSync(SRC_PAGES)
    .map((folderName) =>
      fs
        .readdirSync(`${SRC_PAGES}/${folderName}`)
        .find((fileName) => (fileName.match('test') ? undefined : fileName.endsWith(`.${type}`))),
    );

const ROOT_DIR = join(__dirname, '../');
const SRC_DIR = join(ROOT_DIR, 'src');
const SRC_PAGES = join(SRC_DIR, 'pages');
const JS_FILES = getFiles('ts');
const HTML_FILES = getFiles('html');
const FOLDERS = fs.readdirSync(SRC_PAGES);

const getEtries = () => {
  return JS_FILES.map((file) => {
    const [fileName] = file.split('.');
    return `${SRC_PAGES}/${fileName}/${file}`;
  });
};

module.exports = {
  paths: {
    root: ROOT_DIR,
    src: SRC_DIR,
    pages: SRC_PAGES,
    folders: FOLDERS,
    html: HTML_FILES,
  },
  getFiles,
  commonConfig: {
    entry: ['@babel/polyfill', ...getEtries()],

    module: {
      rules: [
        {
          test: /\.html$/,
          include: SRC_DIR,
          use: 'html-loader',
        },
        {
          test: /\.(gif|png|jpe?g|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/img/[name][contenthash:10][ext]',
          },
        },
        {
          test: /\.svg$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/img/[name].svg',
          },
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name][ext]',
          },
        },
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },

    performance: {
      hints: false,
    },

    resolve: {
      extensions: ['.js', '.ts', '.json'],
      alias: {
        '@src': SRC_DIR,
        '@components': join(SRC_DIR, 'components'),
      },
    },

    plugins: [
      new webpack.ProgressPlugin(),
      new Dotenv({
        systemvars: true,
      }),
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),
      new CopyPlugin({
        patterns: [
          { from: join(SRC_DIR, 'assets/favicons'), to: 'assets/favicons' },
          { from: join(SRC_DIR, 'assets/img'), to: 'assets/img' },
        ],
      }),
    ],
  },
};
