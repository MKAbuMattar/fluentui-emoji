import fs from 'fs';
import path from 'path';

import { RecursiveDirectory, recursiveDirectory } from 'recursive-directory';

type Data = {
  name: string;
  iconName: string;
  svg: string;
  unicode: string;
};

const recursive = async (rootDirs: string, outDir: string, prefix: string) => {
  const data: Data[] = [];
  let name = '';
  let iconName = '';
  let unicode = 0xea01;

  const files: RecursiveDirectory = (await recursiveDirectory(
    rootDirs,
    true,
  )) as RecursiveDirectory;

  files.forEach((file) => {
    name = file.filename
      .replace('.svg', '')
      .replaceAll('-', ' ')
      .toLowerCase()
      .replace(/([^a-z])([a-z])(?=[a-z]{2})|^([a-z])/g, (letter: string) => {
        return letter.toUpperCase();
      });

    iconName = prefix + file.filename.replace('.svg', '');
    data.push({
      name: name,
      iconName: iconName,
      svg: file.filename,
      unicode: (unicode++).toString(16),
    });
  });

  fs.writeFileSync(path.resolve(__dirname, outDir), JSON.stringify(data));
};

(async () => {
  await recursive(
    './icons/high-contrast',
    'build.data.high-contrast.json',
    'fe-hc-',
  );
  await recursive('./icons/flat', 'build.data.flat.json', 'fe-f-');
  await recursive('./icons/modern', 'build.data.modern.json', 'fe-m-');
})();
