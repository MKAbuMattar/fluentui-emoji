import { RecursiveDirectory, recursiveDirectory } from 'recursive-directory';
import fs from 'fs';
import path from 'path';

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
    './icons/regular',
    'build.data.regular.json',
    'fluentui-emoji-regular-',
  );
  await recursive(
    './icons/solid',
    'build.data.solid.json',
    'fluentui-emoji-solid-',
  );
})();
