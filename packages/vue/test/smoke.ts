import assert from 'node:assert/strict';
import {renderToString} from '@vue/server-renderer';
import {createSSRApp, h} from 'vue';
// @ts-expect-error generated at build time
import {Rocket} from '../dist/flat/index.js';
// @ts-expect-error generated at build time
import ModernRocket from '../dist/modern/icons/rocket.js';

const plain = await renderToString(createSSRApp({render: () => h(Rocket)}));
assert.ok(plain.startsWith('<svg'), 'renders an svg');
assert.ok(plain.includes('viewBox="0 0 32 32"'), 'keeps viewBox');
assert.ok(plain.includes('aria-hidden="true"'), 'decorative by default');

const labeled = await renderToString(
  createSSRApp({render: () => h(ModernRocket, {title: 'Rocket', class: 'x'})}),
);
assert.ok(labeled.includes('aria-label="Rocket"'), 'title becomes aria-label');
assert.ok(!labeled.includes('aria-hidden'), 'labeled icon is not hidden');
assert.ok(labeled.includes('class="x"'), 'attrs pass through');

console.log('@fluentui-emoji/vue smoke test passed');
