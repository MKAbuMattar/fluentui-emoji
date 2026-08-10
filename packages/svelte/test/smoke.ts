import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {compile} from 'svelte/compiler';
// @ts-expect-error generated at build time
import {Rocket} from '../dist/flat/index.js';
// @ts-expect-error generated at build time
import ModernRocket from '../dist/modern/icons/rocket.js';

assert.ok(Rocket.html.includes('<path'), 'icon data has svg content');
assert.equal(Rocket.attrs.viewBox, '0 0 32 32', 'viewBox preserved');
assert.ok(ModernRocket.html.length > 0, 'per-icon import works');

const source = fs.readFileSync(
  path.resolve(import.meta.dirname, '../src/Emoji.svelte'),
  'utf8',
);
const {js, warnings} = compile(source, {filename: 'Emoji.svelte'});
assert.ok(js.code.length > 0, 'Emoji.svelte compiles');
const real = warnings.filter(
  (w) => w.code !== 'options_missing_custom_element',
);
assert.deepEqual(real, [], 'Emoji.svelte compiles without warnings');

console.log('@fluentui-emoji/svelte smoke test passed');
