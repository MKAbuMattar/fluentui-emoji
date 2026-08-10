import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {getEmoji, getEmojiPath, metadata} from '../src/index';

assert.ok(metadata.count > 3000, 'metadata has all emojis');
assert.equal(metadata.emojis.length, metadata.count);
assert.deepEqual(metadata.styles, ['flat', 'high-contrast', 'modern']);

assert.equal(getEmoji('rocket')?.name, 'Rocket');
assert.equal(
  getEmojiPath('rocket', 'flat'),
  '@fluentui-emoji/svg/icons/flat/rocket.svg',
);

const svg = fs.readFileSync(
  path.resolve(import.meta.dirname, '../icons/flat/rocket.svg'),
  'utf8',
);
assert.ok(svg.startsWith('<svg'), 'icon file is an svg');
assert.ok(svg.includes('viewBox='), 'viewBox preserved');

console.log('@fluentui-emoji/svg smoke test passed');
