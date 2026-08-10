/**
 * Generates one icon-data module + d.ts per emoji per style, plus a
 * tree-shakeable index per style. Data feeds the Lit element and templates.
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

  for (const {slug, name, attrs, html} of eachIcon(ASSETS, style)) {
    fs.writeFileSync(
      path.join(iconsDir, `${slug}.js`),
      `export const ${name} = {slug: ${JSON.stringify(slug)}, style: ${JSON.stringify(style)}, attrs: ${JSON.stringify(attrs)}, html: ${JSON.stringify(html)}};\nexport default ${name};\n`,
    );
    fs.writeFileSync(
      path.join(iconsDir, `${slug}.d.ts`),
      `import type {FluentEmojiIcon} from '../../index.js';\nexport declare const ${name}: FluentEmojiIcon;\nexport default ${name};\n`,
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
console.log(`@fluentui-emoji/lit: generated ${total} icon data modules`);
