import path from 'path';
import svgtofont from 'svgtofont';

import pkg from '../package.json';

const svg2font = (
  rootDir: string,
  outDir: string,
  fontName: string,
  title: string,
) => {
  const rootPath = path.resolve(process.cwd(), 'script');

  svgtofont({
    src: path.resolve(process.cwd(), rootDir), // svg path
    dist: path.resolve(process.cwd(), outDir), // output path
    styleTemplates: path.resolve(rootPath, 'styles'), // template path
    fontName: fontName, // font name
    css: true, // Create CSS files.
    outSVGPath: true,
    startUnicode: 0xea01, // unicode start number
    svgicons2svgfont: {
      fontHeight: 1000,
      normalize: true,
    },
    svg2ttf: {
      fontHeight: 1000,
      normalize: true,
    },

    // website = null, no demo html files
    website: {
      title: title,
      index: 'font-class',
      favicon: path.resolve(rootPath, 'assets', 'logo.svg'),
      // Must be a .svg format image.
      logo: path.resolve(rootPath, 'assets', 'logo.svg'),
      version: pkg.version,
      meta: {
        description: '',
        keywords: '',
      },
      description: '',
      // Add a Github corner to your website
      // Like: https://github.com/uiwjs/react-github-corners
      corners: {
        url: 'https://github.com/MKAbuMattar/fluentui-emoji',
        width: 62, // default: 60
        height: 62, // default: 60
        bgColor: '#d52128', // default: '#151513'
      },
      links: [
        {
          title: 'GitHub',
          url: 'https://github.com/MKAbuMattar/fluentui-emoji',
        },
        {
          title: 'Feedback',
          url: 'https://github.com/MKAbuMattar/fluentui-emoji/issues',
        },
        {
          title: 'Font Class',
          url: 'index.html',
        },
        {
          title: 'Unicode',
          url: 'unicode.html',
        },
        {
          title: 'Symbol',
          url: 'symbol.html',
        },
      ],
      footerInfo:
        'Licensed under MIT. (Yes it\'s free and <a href="https://github.com/MKAbuMattar/fluentui-emoji">open-sourced</a>',
    },
  }).then(() => {
    console.log('done!');
  });
};

(() => {
  // svg2font(
  //   'icons/@flat',
  //   'fonts/@flat',
  //   'fluentui-emoji-flat',
  //   'Fluentui Emoji Flat',
  // );
  // svg2font(
  //   'icons/@high-contrast',
  //   'fonts/@high-contrast',
  //   'fluentui-emoji-high-contrast',
  //   'Fluentui Emoji High Contrast',
  // );
})();
