// @ts-check
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import {defineConfig} from 'astro/config';
import starlightVersions from 'starlight-versions';
import versions from './versions.json' with {type: 'json'};

// starlight-versions requires at least one archived version; the release
// pipeline appends to versions.json, which activates the version switcher.
const plugins = versions.length ? [starlightVersions({versions})] : [];

export default defineConfig({
  site: 'https://fluentui-emoji.mkabumattar.com',
  integrations: [
    starlight({
      title: 'Fluent UI Emoji',
      description:
        'Fluent UI Emoji packaged for every stack — SVG, React, Astro.',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/MKAbuMattar/fluentui-emoji',
        },
      ],
      plugins,
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            {label: 'SVG', slug: 'getting-started/svg'},
            {label: 'React', slug: 'getting-started/react'},
            {label: 'Preact', slug: 'getting-started/preact'},
            {label: 'Vue', slug: 'getting-started/vue'},
            {label: 'Solid', slug: 'getting-started/solid'},
            {label: 'Svelte', slug: 'getting-started/svelte'},
            {label: 'Astro', slug: 'getting-started/astro'},
            {label: 'Angular', slug: 'getting-started/angular'},
            {label: 'Lit', slug: 'getting-started/lit'},
            {label: 'Web Components', slug: 'getting-started/web-components'},
            {label: 'Alpine.js', slug: 'getting-started/alpine'},
            {label: 'htmx', slug: 'getting-started/htmx'},
          ],
        },
        {label: 'Emoji Gallery', slug: 'gallery'},
      ],
    }),
    react(),
  ],
});
