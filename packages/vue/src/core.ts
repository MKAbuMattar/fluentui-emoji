import {defineComponent, h, type SVGAttributes} from 'vue';

export type FluentEmojiProps = SVGAttributes & {
  /** Accessible label. Without it the emoji is aria-hidden (decorative). */
  title?: string;
};

/** Factory used by the generated icon modules — not meant for direct use. */
export const createFluentEmoji = (
  name: string,
  attrs: Record<string, string>,
  html: string,
) =>
  defineComponent({
    name,
    props: {title: {type: String, required: false}},
    setup(props, {attrs: extra}) {
      return () =>
        h('svg', {
          ...attrs,
          role: 'img',
          'aria-hidden': props.title ? undefined : 'true',
          'aria-label': props.title,
          innerHTML: html,
          ...extra,
        });
    },
  });

export type FluentEmojiComponent = ReturnType<typeof createFluentEmoji>;
