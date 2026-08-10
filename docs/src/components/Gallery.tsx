import {type EmojiStyle, metadata} from '@fluentui-emoji/svg';
import {useMemo, useState} from 'react';

const STYLES: EmojiStyle[] = ['flat', 'high-contrast', 'modern'];

export default function Gallery({base}: {base: string}) {
  const [query, setQuery] = useState('');
  const [style, setStyle] = useState<EmojiStyle>('flat');

  const emojis = useMemo(() => {
    const q = query.trim().toLowerCase().replaceAll(' ', '-');
    return metadata.emojis.filter(
      (e) => e.styles.includes(style) && (!q || e.slug.includes(q)),
    );
  }, [query, style]);

  const prefix = base.endsWith('/') ? base : `${base}/`;

  return (
    <div>
      <div style={{display: 'flex', gap: '.5rem', flexWrap: 'wrap'}}>
        <input
          type="search"
          placeholder={`Search ${metadata.count} emojis…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{flex: '1 1 12rem', padding: '.4rem .6rem'}}
        />
        {STYLES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStyle(s)}
            aria-pressed={s === style}
            style={{
              padding: '.4rem .8rem',
              fontWeight: s === style ? 700 : 400,
            }}
          >
            {s}
          </button>
        ))}
      </div>
      <p>
        {emojis.length} emoji{emojis.length === 1 ? '' : 's'}
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(3.5rem, 1fr))',
          gap: '.5rem',
        }}
      >
        {emojis.map((e) => (
          <img
            key={e.slug}
            src={`${prefix}emoji/${style}/${e.slug}.svg`}
            alt={e.name}
            title={`${e.name} (${e.slug})`}
            loading="lazy"
            width={48}
            height={48}
          />
        ))}
      </div>
    </div>
  );
}
