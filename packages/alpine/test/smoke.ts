import assert from 'node:assert/strict';
// @ts-expect-error generated at build time
import {Rocket} from '../dist/flat/index.js';
// @ts-expect-error generated at build time
import ModernRocket from '../dist/modern/icons/rocket.js';
import fluentEmoji, {emojiHtml, register} from '../src/index';

register(Rocket, ModernRocket);

const plain = emojiHtml('rocket');
assert.ok(plain.startsWith('<svg'), 'renders an svg');
assert.ok(plain.includes('aria-hidden="true"'), 'decorative by default');

const labeled = emojiHtml('rocket', 'modern', 'Rocket "1"');
assert.ok(
  labeled.includes('aria-label="Rocket &quot;1&quot;"'),
  'label escaped',
);
assert.equal(emojiHtml('does-not-exist' as never), '', 'unknown icon is empty');

// plugin wiring with a fake Alpine
const calls: string[] = [];
fluentEmoji({
  magic: (name: string) => calls.push(`magic:${name}`),
  directive: (name: string) => calls.push(`directive:${name}`),
});
assert.deepEqual(calls, ['magic:fluentEmoji', 'directive:fluent-emoji']);

console.log('@fluentui-emoji/alpine smoke test passed');
