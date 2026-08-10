/**
 * Generates one ESM icon module + d.ts per emoji per style from assets/,
 * plus a tree-shakeable index per style. The runtime core (createFluentEmoji)
 * is built separately by tsup; every icon shares its identical type shape,
 * so d.ts files are written from a template — no bundler dts pass needed.
 */
import fs from 'node:fs';
import path from 'node:path';

const PKG = import.meta.dirname;
const ASSETS = path.resolve(PKG, '../../assets');
const DIST = path.join(PKG, 'dist');

const STYLES = ['flat', 'high-contrast', 'modern'] as const;

const componentName = (slug: string): string => {
  const pascal = slug
    .split('-')
    .map((w) => (w[0] ? w[0].toUpperCase() + w.slice(1) : w))
    .join('');
  return /^\d/.test(pascal) ? `Emoji${pascal}` : pascal;
};

const SVG_RE = /^<svg([^>]*)>([\s\S]*)<\/svg>\s*$/;
const ATTR_RE = /([a-zA-Z:-]+)="([^"]*)"/g;

const parseSvg = (
  svg: string,
): {attrs: Record<string, string>; html: string} => {
  const m = SVG_RE.exec(svg);
  if (!m) throw new Error('unparseable svg');
  const attrs: Record<string, string> = {};
  for (const [, key, value] of m[1].matchAll(ATTR_RE)) attrs[key] = value;
  return {attrs, html: m[2]};
};

let total = 0;
for (const style of STYLES) {
  const iconsDir = path.join(DIST, style, 'icons');
  fs.rmSync(path.join(DIST, style), {recursive: true, force: true});
  fs.mkdirSync(iconsDir, {recursive: true});

  const seen = new Map<string, string>();
  const indexJs: string[] = [];
  const indexCjs: string[] = [];

  for (const file of fs.readdirSync(path.join(ASSETS, style)).sort()) {
    if (!file.endsWith('.svg')) continue;
    const slug = file.slice(0, -4);
    const name = componentName(slug);
    const clash = seen.get(name);
    if (clash) throw new Error(`name clash: ${slug} vs ${clash} -> ${name}`);
    seen.set(name, slug);

    const {attrs, html} = parseSvg(
      fs.readFileSync(path.join(ASSETS, style, file), 'utf8'),
    );
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
