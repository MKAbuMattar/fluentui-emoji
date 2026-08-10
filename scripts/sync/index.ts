/**
 * Syncs emoji SVGs from microsoft/fluentui-emoji into assets/.
 *
 * Sparse-clones only the SVG style folders (skips the heavy 3D PNGs),
 * optimizes every SVG with svgo, and rebuilds
 * assets/{flat,high-contrast,modern}/ from scratch.
 *
 * svgo ID prefixes are derived from the slug (deterministic), so re-running
 * sync only diffs icons that actually changed upstream.
 */
import {execSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {type Config, optimize} from 'svgo';

const ROOT = path.resolve(import.meta.dirname, '../..');
const TMP = path.join(ROOT, '.tmp/upstream');
const ASSETS = path.join(ROOT, 'assets');

const UPSTREAM = 'https://github.com/microsoft/fluentui-emoji.git';

const STYLE_DIRS: Record<string, string> = {
  Flat: 'flat',
  'High Contrast': 'high-contrast',
  Color: 'modern',
};

const SPECIAL_CHARS = /[`~!@#$%^&*()|+=?;:'",<>{}[\]\\/]/gi;

const slugify = (filename: string): string =>
  filename
    .replace(/\.svg$/, '')
    .replaceAll('_', '-')
    .replace(SPECIAL_CHARS, '')
    .replaceAll('ñ', 'n')
    .replaceAll('-high-contrast', '')
    .replaceAll('-high contrast', '')
    .replaceAll('-flat', '')
    .replaceAll('-color', '');

const svgoConfig = (slug: string, style: string): Config => ({
  plugins: [
    'preset-default',
    // high-contrast icons are monochrome — currentColor lets CSS color them
    ...(style === 'high-contrast'
      ? ([{name: 'convertColors', params: {currentColor: true}}] as const)
      : []),
    'convertStyleToAttrs',
    'cleanupIds',
    {
      name: 'prefixIds',
      params: {delim: '', prefix: `fe-${slug}-`},
    },
    'removeDimensions',
  ],
});

const clone = (): void => {
  fs.rmSync(TMP, {recursive: true, force: true});
  console.log(`Cloning ${UPSTREAM} (sparse, SVGs only)...`);
  execSync(
    `git clone --depth=1 --filter=blob:none --sparse ${UPSTREAM} ${TMP}`,
    {stdio: 'inherit'},
  );
  execSync(
    `git -C ${TMP} sparse-checkout set --no-cone 'assets/**/Flat/**' 'assets/**/High Contrast/**' 'assets/**/Color/**'`,
    {stdio: 'inherit'},
  );
};

const extract = (): void => {
  for (const dir of Object.values(STYLE_DIRS)) {
    fs.rmSync(path.join(ASSETS, dir), {recursive: true, force: true});
    fs.mkdirSync(path.join(ASSETS, dir), {recursive: true});
  }

  const files = fs
    .readdirSync(path.join(TMP, 'assets'), {recursive: true})
    .map(String)
    .filter((p) => p.endsWith('.svg'));

  let written = 0;
  for (const rel of files) {
    const style = Object.keys(STYLE_DIRS).find((s) =>
      rel.includes(`${path.sep}${s}${path.sep}`),
    );
    if (!style) continue;

    const slug = slugify(path.basename(rel));
    const raw = fs.readFileSync(path.join(TMP, 'assets', rel), 'utf8');
    const {data} = optimize(raw, svgoConfig(slug, STYLE_DIRS[style]));
    fs.writeFileSync(path.join(ASSETS, STYLE_DIRS[style], `${slug}.svg`), data);
    written++;
  }
  console.log(`Wrote ${written} optimized SVGs to assets/`);
};

clone();
extract();
fs.rmSync(TMP, {recursive: true, force: true});
