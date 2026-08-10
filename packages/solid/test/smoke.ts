import assert from 'node:assert/strict';
import {renderToString} from 'solid-js/web';
// @ts-expect-error generated at build time
import {Rocket} from '../dist/flat/index.js';
// @ts-expect-error generated at build time
import ModernRocket from '../dist/modern/icons/rocket.js';

const plain = renderToString(() => Rocket({}));
assert.ok(plain.includes('<svg'), 'renders an svg');
assert.ok(plain.includes('viewBox="0 0 32 32"'), 'keeps viewBox');
assert.ok(plain.includes('aria-hidden="true"'), 'decorative by default');

const labeled = renderToString(() =>
  ModernRocket({title: 'Rocket', class: 'x'}),
);
assert.ok(labeled.includes('aria-label="Rocket"'), 'title becomes aria-label');
assert.ok(labeled.includes('class="x'), 'props pass through');

console.log('@fluentui-emoji/solid smoke test passed');
