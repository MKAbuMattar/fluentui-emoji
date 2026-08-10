import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve(import.meta.dirname, '../dist');

for (const set of ['flat', 'high-contrast', 'modern']) {
  const col = JSON.parse(
    fs.readFileSync(path.join(dist, `${set}.json`), 'utf8'),
  );
  assert.equal(col.prefix, `fluentui-emoji-${set}`);
  assert.ok(Object.keys(col.icons).length > 1000, `${set} has icons`);
  const rocket = col.icons.rocket;
  assert.ok(rocket, 'rocket exists');
  assert.ok(rocket.body.includes('<path'), 'body is inner svg');
  assert.equal(rocket.width, 32);
  assert.equal(rocket.height, 32);
}

const {sets, prefix} = await import('../dist/index.js');
assert.deepEqual([...sets], ['flat', 'high-contrast', 'modern']);
assert.equal(prefix('flat'), 'fluentui-emoji-flat');

console.log('@fluentui-emoji/iconify smoke test passed');
