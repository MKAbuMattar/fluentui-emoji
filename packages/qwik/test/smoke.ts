import assert from 'node:assert/strict';
// @ts-expect-error generated at build time
import {Rocket} from '../dist/flat/index.js';
// @ts-expect-error generated at build time
import ModernRocket from '../dist/modern/icons/rocket.js';

const plain = Rocket({}) as {type: unknown; props: Record<string, unknown>};
assert.equal(plain.type, 'svg', 'renders an svg jsx node');
assert.equal(plain.props.viewBox, '0 0 32 32', 'keeps viewBox');
assert.equal(plain.props['aria-hidden'], 'true', 'decorative by default');
assert.ok(
  String(plain.props.dangerouslySetInnerHTML).includes('<path'),
  'body present',
);

const labeled = ModernRocket({title: 'Rocket', class: 'x'}) as {
  props: Record<string, unknown>;
};
assert.equal(labeled.props['aria-label'], 'Rocket', 'title becomes aria-label');
assert.equal(
  labeled.props['aria-hidden'],
  undefined,
  'labeled icon not hidden',
);
assert.equal(labeled.props.class, 'x', 'props pass through');

console.log('@fluentui-emoji/qwik smoke test passed');
