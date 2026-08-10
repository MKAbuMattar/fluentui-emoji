import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spriteHref, spritePath} from '../src/index';

const dist = path.resolve(import.meta.dirname, '../dist');

const flat = fs.readFileSync(path.join(dist, 'flat.svg'), 'utf8');
assert.ok(flat.startsWith('<svg'), 'sprite is an svg');
assert.ok(
  flat.includes('<symbol id="rocket" viewBox="0 0 32 32">'),
  'rocket symbol',
);
assert.ok((flat.match(/<symbol /g) ?? []).length > 3000, 'all symbols present');

assert.equal(
  spriteHref('/sprites/flat.svg', 'rocket'),
  '/sprites/flat.svg#rocket',
);
assert.equal(spritePath('flat'), '@fluentui-emoji/sprite/flat.svg');

console.log('@fluentui-emoji/sprite smoke test passed');
