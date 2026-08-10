import {type EmojiStyle, metadata} from '@fluentui-emoji/svg';
import {useEffect, useMemo, useRef, useState} from 'react';

const STYLES: EmojiStyle[] = ['flat', 'high-contrast', 'modern'];

const componentName = (slug: string): string => {
  const pascal = slug
    .split('-')
    .map((w) => (w[0] ? w[0].toUpperCase() + w.slice(1) : w))
    .join('');
  return /^\d/.test(pascal) ? `Emoji${pascal}` : pascal;
};

const snippets = (
  slug: string,
  style: EmojiStyle,
): {id: string; label: string; code: string}[] => {
  const name = componentName(slug);
  return [
    {
      id: 'svg',
      label: 'SVG',
      code: `import svg from '@fluentui-emoji/svg/icons/${style}/${slug}.svg';\n\n// or resolve the path at runtime:\nimport {getEmojiPath} from '@fluentui-emoji/svg';\ngetEmojiPath('${slug}', '${style}');`,
    },
    {
      id: 'react',
      label: 'React',
      code: `import {${name}} from '@fluentui-emoji/react/${style}';\n\n<${name} width={32} title="${componentName(slug)}" />`,
    },
    {
      id: 'preact',
      label: 'Preact',
      code: `import {${name}} from '@fluentui-emoji/preact/${style}';\n\n<${name} width={32} />`,
    },
    {
      id: 'vue',
      label: 'Vue',
      code: `<script setup>\nimport {${name}} from '@fluentui-emoji/vue/${style}';\n</script>\n\n<template>\n  <${name} width="32" />\n</template>`,
    },
    {
      id: 'solid',
      label: 'Solid',
      code: `import {${name}} from '@fluentui-emoji/solid/${style}';\n\n<${name} width={32} />`,
    },
    {
      id: 'svelte',
      label: 'Svelte',
      code: `<script>\nimport {Emoji} from '@fluentui-emoji/svelte';\nimport {${name}} from '@fluentui-emoji/svelte/${style}';\n</script>\n\n<Emoji icon={${name}} width="32" />`,
    },
    {
      id: 'astro',
      label: 'Astro',
      code: `---\nimport {Emoji} from '@fluentui-emoji/astro';\n---\n\n<Emoji name="${slug}" variant="${style}" width="32" />`,
    },
    {
      id: 'angular',
      label: 'Angular',
      code: `import {FluentEmojiDirective, register} from '@fluentui-emoji/angular';\nimport {${name}} from '@fluentui-emoji/angular/${style}';\n\nregister(${name});\n\n// template (import FluentEmojiDirective in the component):\n<span fluentEmoji="${slug}" emojiStyle="${style}"></span>`,
    },
    {
      id: 'lit',
      label: 'Lit',
      code: `import {defineFluentEmoji, register} from '@fluentui-emoji/lit';\nimport {${name}} from '@fluentui-emoji/lit/${style}';\n\nregister(${name});\ndefineFluentEmoji();\n\n<fluent-emoji name="${slug}" variant="${style}"></fluent-emoji>`,
    },
    {
      id: 'wc',
      label: 'Web Components',
      code: `import {defineFluentEmoji, register} from '@fluentui-emoji/web-components';\nimport {${name}} from '@fluentui-emoji/web-components/${style}';\n\nregister(${name});\ndefineFluentEmoji();\n\n<fluent-emoji name="${slug}" variant="${style}"></fluent-emoji>`,
    },
    {
      id: 'alpine',
      label: 'Alpine.js',
      code: `import Alpine from 'alpinejs';\nimport fluentEmoji, {register} from '@fluentui-emoji/alpine';\nimport {${name}} from '@fluentui-emoji/alpine/${style}';\n\nregister(${name});\nAlpine.plugin(fluentEmoji);\n\n<span x-fluent-emoji="{name: '${slug}', style: '${style}'}"></span>`,
    },
    {
      id: 'htmx',
      label: 'htmx',
      code: `// server\nimport {fluentEmojiHandler} from '@fluentui-emoji/htmx';\napp.use(fluentEmojiHandler());\n\n<!-- page -->\n<span hx-get="/fluentui-emoji/${style}/${slug}" hx-trigger="load"></span>`,
    },
  ];
};

/** Fetches an SVG once and renders it inline when scrolled into view. */
const svgCache = new Map<string, Promise<string>>();
const fetchSvg = (url: string): Promise<string> => {
  let hit = svgCache.get(url);
  if (!hit) {
    hit = fetch(url).then((r) => (r.ok ? r.text() : ''));
    svgCache.set(url, hit);
  }
  return hit;
};

function InlineEmoji({url, size = 40}: {url: string; size?: number}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [svg, setSvg] = useState('');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let alive = true;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        fetchSvg(url).then((text) => alive && setSvg(text));
      }
    });
    io.observe(el);
    return () => {
      alive = false;
      io.disconnect();
    };
  }, [url]);

  return (
    <span
      ref={ref}
      className="fe-icon"
      style={{width: size, height: size}}
      aria-hidden="true"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: build-time trusted SVG assets
      dangerouslySetInnerHTML={svg ? {__html: svg} : undefined}
    />
  );
}

export default function Gallery({base}: {base: string}) {
  const [query, setQuery] = useState('');
  const [style, setStyle] = useState<EmojiStyle>('flat');
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState('svg');
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const prefix = base.endsWith('/') ? base : `${base}/`;
  const url = (slug: string) => `${prefix}emoji/${style}/${slug}.svg`;

  const emojis = useMemo(() => {
    const q = query.trim().toLowerCase().replaceAll(' ', '-');
    return metadata.emojis.filter(
      (e) => e.styles.includes(style) && (!q || e.slug.includes(q)),
    );
  }, [query, style]);

  const current = selected
    ? metadata.emojis.find((e) => e.slug === selected)
    : undefined;
  const tabs = current ? snippets(current.slug, style) : [];
  const activeSnippet = tabs.find((t) => t.id === tab) ?? tabs[0];

  const open = (slug: string) => {
    setSelected(slug);
    setCopied(false);
    dialogRef.current?.showModal();
  };

  const copy = () => {
    if (!activeSnippet) return;
    navigator.clipboard.writeText(activeSnippet.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="fe-gallery">
      <style>{`
        .fe-gallery .fe-controls {display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;}
        .fe-gallery input[type='search'] {flex: 1 1 14rem; padding: 0.5rem 0.75rem; border: 1px solid var(--sl-color-gray-4); border-radius: 0.5rem; background: var(--sl-color-bg); color: var(--sl-color-text); font-size: var(--sl-text-sm);}
        .fe-gallery input[type='search']:focus-visible {outline: 2px solid var(--sl-color-accent); outline-offset: 1px;}
        .fe-gallery .fe-styles {display: flex; margin: 0; padding: 0; border: 1px solid var(--sl-color-gray-4); border-radius: 0.5rem; overflow: hidden;}
        .fe-gallery .fe-styles button {padding: 0.5rem 0.9rem; border: 0; background: transparent; color: var(--sl-color-text); cursor: pointer; font-size: var(--sl-text-sm);}
        .fe-gallery .fe-styles button[aria-pressed='true'] {background: var(--sl-color-text-accent); color: var(--sl-color-text-invert); font-weight: 600;}
        .fe-gallery .fe-count {margin: 0.75rem 0; color: var(--sl-color-gray-2); font-size: var(--sl-text-sm);}
        .fe-gallery .fe-grid {display: grid; grid-template-columns: repeat(auto-fill, minmax(3.25rem, 1fr)); gap: 0.4rem;}
        .fe-gallery .fe-cell {display: grid; place-items: center; padding: 0.4rem; border: 1px solid transparent; border-radius: 0.5rem; background: transparent; cursor: pointer;}
        .fe-gallery .fe-cell:hover, .fe-gallery .fe-cell:focus-visible {border-color: var(--sl-color-gray-4); background: var(--sl-color-gray-6);}
        .fe-gallery .fe-icon {display: block;}
        .fe-gallery .fe-icon svg {width: 100%; height: 100%; display: block;}
        .fe-gallery .fe-empty {padding: 2.5rem 0; text-align: center; color: var(--sl-color-gray-2);}
        .fe-dialog {width: min(44rem, calc(100vw - 2rem)); border: 1px solid var(--sl-color-gray-4); border-radius: 0.75rem; background: var(--sl-color-bg); color: var(--sl-color-text); padding: 1.25rem;}
        .fe-dialog::backdrop {background: rgb(0 0 0 / 0.45);}
        .fe-dialog .fe-head {display: flex; align-items: center; gap: 0.75rem; margin: 0 0 1rem;}
        .fe-dialog .fe-head h3 {margin: 0; font-size: var(--sl-text-lg); flex: 1;}
        .fe-dialog .fe-head code {color: var(--sl-color-gray-2); font-size: var(--sl-text-xs);}
        .fe-dialog .fe-close {border: 1px solid var(--sl-color-gray-4); background: transparent; color: var(--sl-color-text); border-radius: 0.5rem; padding: 0.25rem 0.6rem; cursor: pointer;}
        .fe-dialog .fe-tabs {display: flex; flex-wrap: wrap; gap: 0.3rem; margin-bottom: 0.75rem;}
        .fe-dialog .fe-tabs button {border: 1px solid var(--sl-color-gray-4); background: transparent; color: var(--sl-color-text); border-radius: 0.5rem; padding: 0.3rem 0.65rem; font-size: var(--sl-text-xs); cursor: pointer;}
        .fe-dialog .fe-tabs button[aria-selected='true'] {background: var(--sl-color-text-accent); color: var(--sl-color-text-invert); border-color: var(--sl-color-text-accent); font-weight: 600;}
        .fe-dialog pre {margin: 0; padding: 1rem; border-radius: 0.5rem; background: var(--sl-color-gray-6); overflow-x: auto; font-size: var(--sl-text-xs); line-height: 1.6;}
        .fe-dialog .fe-actions {display: flex; justify-content: flex-end; margin-top: 0.75rem;}
        .fe-dialog .fe-copy {border: 1px solid var(--sl-color-gray-4); background: var(--sl-color-gray-6); color: var(--sl-color-text); border-radius: 0.5rem; padding: 0.4rem 0.9rem; font-size: var(--sl-text-sm); cursor: pointer;}
        .fe-dialog .fe-copy:active {transform: scale(0.98);}
      `}</style>

      <div className="fe-controls">
        <input
          type="search"
          placeholder={`Search ${metadata.count} emojis by name`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search emojis"
        />
        <fieldset className="fe-styles" aria-label="Icon style">
          {STYLES.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={s === style}
              onClick={() => setStyle(s)}
            >
              {s}
            </button>
          ))}
        </fieldset>
      </div>

      <p className="fe-count">
        {emojis.length === metadata.count
          ? `${emojis.length} emojis`
          : `${emojis.length} of ${metadata.count} emojis`}
      </p>

      {emojis.length === 0 ? (
        <p className="fe-empty">
          Nothing matches "{query}". Try a simpler word, like "cat" or "heart".
        </p>
      ) : (
        <div className="fe-grid">
          {emojis.map((e) => (
            <button
              key={e.slug}
              type="button"
              className="fe-cell"
              title={e.name}
              aria-label={`${e.name}: show usage`}
              onClick={() => open(e.slug)}
            >
              <InlineEmoji url={url(e.slug)} />
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialogRef}
        className="fe-dialog"
        onClose={() => setSelected(null)}
        aria-label={current ? `${current.name} usage` : 'Emoji usage'}
      >
        {current && (
          <>
            <div className="fe-head">
              <InlineEmoji url={url(current.slug)} size={44} />
              <h3>
                {current.name} <code>{current.slug}</code>
              </h3>
              <button
                type="button"
                className="fe-close"
                onClick={() => dialogRef.current?.close()}
              >
                Close
              </button>
            </div>
            <div className="fe-tabs" role="tablist" aria-label="Framework">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={t.id === (activeSnippet?.id ?? 'svg')}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <pre>
              <code>{activeSnippet?.code}</code>
            </pre>
            <div className="fe-actions">
              <button type="button" className="fe-copy" onClick={copy}>
                {copied ? 'Copied' : 'Copy snippet'}
              </button>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
