import assert from 'node:assert/strict';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
// @ts-expect-error generated at build time
import {Rocket} from '../dist/flat/index.js';
// @ts-expect-error generated at build time
import HighContrastRocket from '../dist/high-contrast/icons/rocket.js';

const flat = renderToStaticMarkup(createElement(Rocket));
assert.ok(flat.startsWith('<svg'), 'renders an svg');
assert.ok(flat.includes('viewBox="0 0 32 32"'), 'keeps viewBox');
assert.ok(flat.includes('aria-hidden="true"'), 'decorative by default');

const labeled = renderToStaticMarkup(
  createElement(HighContrastRocket, {title: 'Rocket', className: 'x'}),
);
assert.ok(labeled.includes('aria-label="Rocket"'), 'title becomes aria-label');
assert.ok(!labeled.includes('aria-hidden'), 'labeled icon is not hidden');
assert.ok(labeled.includes('class="x"'), 'props pass through');

console.log('@fluentui-emoji/react smoke test passed');
