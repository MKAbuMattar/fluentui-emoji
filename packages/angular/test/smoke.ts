// JIT fallback so the partial-Ivy declarations evaluate outside Angular's linker
import '@angular/compiler';
import assert from 'node:assert/strict';
// @ts-expect-error generated at build time
import {Rocket} from '../dist/flat/index.js';
// @ts-expect-error generated at build time
import ModernRocket from '../dist/modern/icons/rocket.js';
// compiled FESM — partial-Ivy output importable in plain node
// @ts-expect-error built by ng-packagr
import {
  emojiHtml,
  FluentEmojiDirective,
  register,
} from '../lib/fesm2022/fluentui-emoji-angular.mjs';

register(Rocket, ModernRocket);

const plain = emojiHtml('rocket');
assert.ok(plain.startsWith('<svg'), 'renders an svg');
assert.ok(plain.includes('aria-hidden="true"'), 'decorative by default');

const labeled = emojiHtml('rocket', 'modern', 'Rocket "1"');
assert.ok(
  labeled.includes('aria-label="Rocket &quot;1&quot;"'),
  'label escaped',
);
assert.equal(emojiHtml('nope'), '', 'unknown icon is empty');

assert.equal(typeof FluentEmojiDirective, 'function', 'directive exports');
// partial-Ivy compilation marker consumed by the Angular linker
assert.ok(
  'ɵdir' in FluentEmojiDirective || 'ɵfac' in FluentEmojiDirective,
  'Ivy partial compilation present',
);

console.log('@fluentui-emoji/angular smoke test passed');
