/**
 * Generates one IconifyJSON collection per set (prefix fluentui-emoji-<set>)
 * plus a tiny typed index. Consumers: unplugin-icons, the Tailwind Iconify
 * plugin, or `addCollection` from any Iconify component.
 */
import fs from 'node:fs';
import path from 'node:path';
import {eachIcon, STYLES} from '../../scripts/generate/svg-lib';

const PKG = import.meta.dirname;
const ASSETS = path.resolve(PKG, '../../assets');
const DIST = path.join(PKG, 'dist');

fs.rmSync(DIST, {recursive: true, force: true});
fs.mkdirSync(DIST, {recursive: true});

let total = 0;
for (const style of STYLES) {
  const icons: Record<string, {body: string; width: number; height: number}> =
    {};
  for (const {slug, attrs, html} of eachIcon(ASSETS, style)) {
    const [, , w, h] = (attrs.viewBox ?? '0 0 32 32').split(' ').map(Number);
    icons[slug] = {body: html, width: w, height: h};
    total++;
  }
  const collection = {
    prefix: `fluentui-emoji-${style}`,
    lastModified: 0,
    icons,
  };
  fs.writeFileSync(
    path.join(DIST, `${style}.json`),
    `${JSON.stringify(collection)}\n`,
  );
}

fs.writeFileSync(
  path.join(DIST, 'index.js'),
  `export const sets = ${JSON.stringify(STYLES)};\nexport const prefix = (set) => \`fluentui-emoji-\${set}\`;\n`,
);
fs.writeFileSync(
  path.join(DIST, 'index.d.ts'),
  `export type IconSet = ${STYLES.map((s) => `'${s}'`).join(' | ')};
export declare const sets: readonly IconSet[];
export declare const prefix: (set: IconSet) => string;
`,
);
console.log(
  `@fluentui-emoji/iconify: ${total} icons across ${STYLES.length} collections`,
);
