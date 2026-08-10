/**
 * Generates one ESM icon module + d.ts per emoji per style from assets/,
 * plus a tree-shakeable index per style. The runtime core (createFluentEmoji)
 * is built separately by tsup; every icon shares its identical type shape,
 * so d.ts files are written from a template — no bundler dts pass needed.
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
  const indexCjs: string[] = [];

  for (const {slug, name, attrs, html} of eachIcon(ASSETS, style)) {
    const args = `${JSON.stringify(name)}, ${JSON.stringify(attrs)}, ${JSON.stringify(html)}`;

    fs.writeFileSync(
      path.join(iconsDir, `${slug}.js`),
      `import {createFluentEmoji} from '../../core.js';\nexport const ${name} = createFluentEmoji(${args});\nexport default ${name};\n`,
    );
    fs.writeFileSync(
      path.join(iconsDir, `${slug}.cjs`),
      `'use strict';\nconst {createFluentEmoji} = require('../../core.cjs');\nconst ${name} = createFluentEmoji(${args});\nmodule.exports = ${name};\nmodule.exports.${name} = ${name};\nmodule.exports.default = ${name};\n`,
    );
    const dts = (core: string) =>
      `import type {FluentEmojiComponent} from '../../${core}';\nexport declare const ${name}: FluentEmojiComponent;\nexport default ${name};\n`;
    fs.writeFileSync(path.join(iconsDir, `${slug}.d.ts`), dts('core.js'));
    fs.writeFileSync(path.join(iconsDir, `${slug}.d.cts`), dts('core.cjs'));

    indexJs.push(`export {${name}} from './icons/${slug}.js';`);
    indexCjs.push(
      `module.exports.${name} = require('./icons/${slug}.cjs').${name};`,
    );
    total++;
  }

  fs.writeFileSync(
    path.join(DIST, style, 'index.js'),
    `${indexJs.join('\n')}\n`,
  );
  fs.writeFileSync(
    path.join(DIST, style, 'index.cjs'),
    `'use strict';\n${indexCjs.join('\n')}\n`,
  );
  const indexDts = indexJs.join('\n');
  fs.writeFileSync(path.join(DIST, style, 'index.d.ts'), `${indexDts}\n`);
  fs.writeFileSync(
    path.join(DIST, style, 'index.d.cts'),
    `${indexJs.map((l) => l.replace('.js', '.cjs')).join('\n')}\n`,
  );
}
console.log(`@fluentui-emoji/react: generated ${total} icon components`);
