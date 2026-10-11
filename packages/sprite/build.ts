/**
 * Generates one SVG symbol sprite per set: <symbol id="<slug>" viewBox=...>.
 * Copy the sprite into your static assets and reference icons with
 * <svg><use href="/sprites/flat.svg#rocket" /></svg>.
 */
import fs from 'node:fs';
import path from 'node:path';
import {eachIcon, STYLES} from '../../scripts/generate/svg-lib';

const PKG = import.meta.dirname;
const ASSETS = path.resolve(PKG, '../../assets');
const DIST = path.join(PKG, 'dist');

fs.mkdirSync(DIST, {recursive: true});

let total = 0;
for (const style of STYLES) {
  const symbols: string[] = [];
  for (const {slug, attrs, html} of eachIcon(ASSETS, style)) {
    symbols.push(
      `<symbol id="${slug}" viewBox="${attrs.viewBox ?? '0 0 32 32'}">${html}</symbol>`,
    );
    total++;
  }
  fs.writeFileSync(
    path.join(DIST, `${style}.svg`),
    `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${symbols.join('')}</svg>\n`,
  );
}
console.log(
  `@fluentui-emoji/sprite: ${total} symbols across ${STYLES.length} sprites`,
);
