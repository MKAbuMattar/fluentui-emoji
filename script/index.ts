import path from 'path';
import svgtofont from 'svgtofont';

const svg2font = (rootDir: string, outDir: string, fontName: string) => {
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
  }).then(() => {
    console.log('done!');
  });
};

(() => {
  // svg2font(
  //   'icons/regular',
  //   'fonts/regular',
  //   'fluentui-emoji-regular',
  // );
  // svg2font(
  //   'icons/solid',
  //   'fonts/solid',
  //   'fluentui-emoji-solid',
  // );
})();
