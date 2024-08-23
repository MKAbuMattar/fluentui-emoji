/** @type {import('svgo').Config} */
const svgoConfig = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    'convertStyleToAttrs',
    'prefixIds',
    'removeDimensions',
  ],
};

module.exports = svgoConfig;