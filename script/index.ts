import path from 'path';
import svgtofont from 'svgtofont';

const svg2font = (
  rootDir: string,
  outDir: string,
  fontName: string,
  cssFileName: string,
  prefix: string,
  type: string,
) => {
  const rootPath = path.resolve(process.cwd(), 'script');

  svgtofont({
    src: path.resolve(process.cwd(), rootDir), // svg path
    dist: path.resolve(process.cwd(), outDir), // output path
    styleTemplates: path.resolve(rootPath, 'styles'), // template path
    fontName: fontName, // font name
    classNamePrefix: prefix, // class name prefix
    css: {
      output: `/styles/${type}`,
      fileName: cssFileName,
      cssPath: `/fonts/${type}/`,
    }, // Create CSS files.
  }).then(() => {
    console.log('done!');
  });
};

(() => {
  // svg2font(
  //   'icons/high-contrast',
  //   'fonts/high-contrast',
  //   'fluentui-emoji-high-contrast',
  //   'fluentui-emoji',
  //   'fe-hc',
  //   'high-contrast',
  // );
  // svg2font(
  //   'icons/flat',
  //   'fonts/flat',
  //   'fluentui-emoji-flat',
  //   'fluentui-emoji',
  //   'fe-f',
  //   'flat',
  // );
})();
