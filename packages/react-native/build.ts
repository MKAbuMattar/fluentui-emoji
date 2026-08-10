/**
 * Generates one icon module + d.ts per emoji per set. Each module carries the
 * full SVG XML string; the runtime core renders it with react-native-svg's
 * SvgXml (no innerHTML — React Native has no DOM).
 */
import fs from 'node:fs';
import path from 'node:path';
import {eachIcon, STYLES} from '../../scripts/generate/svg-lib';

const PKG = import.meta.dirname;
const ASSETS = path.resolve(PKG, '../../assets');
const DIST = path.join(PKG, 'dist');

let total = 0;
for (const style of STYLES) {
  const iconsDir = path.join(DIST, style, 'icons');
  fs.rmSync(path.join(DIST, style), {recursive: true, force: true});
  fs.mkdirSync(iconsDir, {recursive: true});

  const indexJs: string[] = [];

  for (const {slug, name} of eachIcon(ASSETS, style)) {
    const xml = fs.readFileSync(
      path.join(ASSETS, style, `${slug}.svg`),
      'utf8',
    );
    fs.writeFileSync(
      path.join(iconsDir, `${slug}.js`),
      `import {createFluentEmoji} from '../../core.js';\nexport const ${name} = createFluentEmoji(${JSON.stringify(name)}, ${JSON.stringify(xml)});\nexport default ${name};\n`,
    );
    fs.writeFileSync(
      path.join(iconsDir, `${slug}.d.ts`),
      `import type {FluentEmojiComponent} from '../../core.js';\nexport declare const ${name}: FluentEmojiComponent;\nexport default ${name};\n`,
    );
    indexJs.push(`export {${name}} from './icons/${slug}.js';`);
    total++;
  }

  fs.writeFileSync(
    path.join(DIST, style, 'index.js'),
    `${indexJs.join('\n')}\n`,
  );
  fs.writeFileSync(
    path.join(DIST, style, 'index.d.ts'),
    `${indexJs.join('\n')}\n`,
  );
}
console.log(`@fluentui-emoji/react-native: generated ${total} icon components`);
