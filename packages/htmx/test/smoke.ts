import assert from 'node:assert/strict';
import {emojiHtml, fluentEmojiHandler} from '../src/index';

const svg = await emojiHtml('rocket');
assert.ok(svg.startsWith('<svg'), 'serves an svg fragment');
assert.ok(svg.includes('aria-hidden="true"'), 'decorative by default');

const labeled = await emojiHtml('rocket', 'modern', 'Rocket "1"');
assert.ok(
  labeled.includes('aria-label="Rocket &quot;1&quot;"'),
  'label escaped',
);

const handler = fluentEmojiHandler();
const call = async (url: string) => {
  const headers: Record<string, string> = {};
  let body = '';
  let statusCode = 200;
  await handler(
    {url} as never,
    {
      setHeader: (k: string, v: string) => {
        headers[k] = v;
      },
      end: (chunk?: string) => {
        body = chunk ?? '';
      },
      get statusCode() {
        return statusCode;
      },
      set statusCode(v: number) {
        statusCode = v;
      },
    } as never,
  );
  return {statusCode, headers, body};
};

const ok = await call('/fluentui-emoji/flat/rocket?label=Rocket');
assert.equal(ok.statusCode, 200);
assert.ok(
  ok.body.includes('aria-label="Rocket"'),
  'handler serves labeled svg',
);
assert.ok(ok.headers['Cache-Control']?.includes('immutable'), 'cacheable');

const missing = await call('/fluentui-emoji/flat/not-a-real-emoji');
assert.equal(missing.statusCode, 404, 'unknown slug is 404');

const traversal = await call('/fluentui-emoji/flat/..%2F..%2Fpackage');
assert.equal(traversal.statusCode, 404, 'path traversal rejected');

console.log('@fluentui-emoji/htmx smoke test passed');
