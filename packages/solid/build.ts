/**
 * Builds the core three ways — DOM (browser), SSR (node), and type-stripped
 * JSX source for the `solid` export condition — then generates one icon
 * module + d.ts per emoji per style. Icon modules are plain JS importing the
 * core via package self-reference, so the right core build resolves per env.
 */
import fs from 'node:fs';
import path from 'node:path';
import {transformFileAsync} from '@babel/core';
import {eachIcon, STYLES} from '../../scripts/generate/svg-lib';

const PKG = import.meta.dirname;
const ASSETS = path.resolve(PKG, '../../assets');
const DIST = path.join(PKG, 'dist');
const CORE = path.join(PKG, 'src/core.tsx');

fs.rmSync(DIST, {recursive: true, force: true});
fs.mkdirSync(path.join(DIST, 'source'), {recursive: true});

const ts = ['@babel/preset-typescript', {isTSX: true, allExtensions: true}];

const emit = async (presets: unknown[], outFile: string) => {
  const result = await transformFileAsync(CORE, {
    presets: presets as never,
    babelrc: false,
    configFile: false,
  });
  if (!result?.code) throw new Error(`babel produced no output for ${outFile}`);
  fs.writeFileSync(path.join(DIST, outFile), `${result.code}\n`);
};

await emit([['babel-preset-solid', {}], ts], 'core.js');
await emit(
  [['babel-preset-solid', {generate: 'ssr', hydratable: false}], ts],
  'core.ssr.js',
);
await emit([ts], 'source/core.jsx');

fs.writeFileSync(
  path.join(DIST, 'core.d.ts'),
  `import type {Component, JSX} from 'solid-js';
export type FluentEmojiProps = JSX.SvgSVGAttributes<SVGSVGElement> & {title?: string};
export type FluentEmojiComponent = Component<FluentEmojiProps>;
export declare const createFluentEmoji: (name: string, attrs: Record<string, string>, html: string) => FluentEmojiComponent;
`,
);

let total = 0;
for (const style of STYLES) {
  const iconsDir = path.join(DIST, style, 'icons');
  fs.mkdirSync(iconsDir, {recursive: true});

  const indexJs: string[] = [];

  for (const {slug, name, attrs, html} of eachIcon(ASSETS, style)) {
    const args = `${JSON.stringify(name)}, ${JSON.stringify(attrs)}, ${JSON.stringify(html)}`;
    fs.writeFileSync(
      path.join(iconsDir, `${slug}.js`),
      `import {createFluentEmoji} from '@fluentui-emoji/solid';\nexport const ${name} = createFluentEmoji(${args});\nexport default ${name};\n`,
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
console.log(`@fluentui-emoji/solid: generated ${total} icon components`);
