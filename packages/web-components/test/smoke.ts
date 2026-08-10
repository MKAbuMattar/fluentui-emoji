import assert from 'node:assert/strict';
import {Window} from 'happy-dom';

const window = new Window();
Object.assign(globalThis, {
  HTMLElement: window.HTMLElement,
  customElements: window.customElements,
  document: window.document,
});

const {defineFluentEmoji, register} = await import('../dist/index.js');
// @ts-expect-error generated at build time
const {Rocket} = await import('../dist/flat/index.js');
// @ts-expect-error generated at build time
const {default: ModernRocket} = await import('../dist/modern/icons/rocket.js');

assert.equal(Rocket.slug, 'rocket');
assert.equal(Rocket.style, 'flat');

defineFluentEmoji();
register(Rocket, ModernRocket);

const el = document.createElement('fluent-emoji');
el.setAttribute('name', 'rocket');
document.body.appendChild(el);
assert.ok(el.innerHTML.includes('<svg'), 'renders registered icon by name');
assert.ok(el.innerHTML.includes('aria-hidden'), 'decorative by default');

el.setAttribute('variant', 'modern');
el.setAttribute('label', 'Rocket');
assert.ok(
  el.innerHTML.includes('aria-label="Rocket"'),
  'label becomes aria-label',
);

// @ts-expect-error property assignment on custom element
el.icon = Rocket;
assert.ok(el.innerHTML.includes('viewBox'), 'icon property renders directly');

console.log('@fluentui-emoji/web-components smoke test passed');
