module.exports = ({ file, options, env }) => ({
  parser: file.extname === '.sss' ? 'sugarss' : false,
  plugins: {
    'postcss-import': {},
    autoprefixer: {},
    'postcss-preset-env': {},
    cssnano: env === 'production' ? {} : false,
  },
});
