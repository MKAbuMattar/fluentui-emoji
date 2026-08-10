import {type JSXOutput, jsx} from '@builder.io/qwik';

export type FluentEmojiProps = Record<string, unknown> & {
  /** Accessible label. Without it the emoji is aria-hidden (decorative). */
  title?: string;
};

export type FluentEmojiComponent = (props?: FluentEmojiProps) => JSXOutput;

/** Factory used by the generated icon modules — not meant for direct use. */
export const createFluentEmoji = (
  name: string,
  attrs: Record<string, string>,
  html: string,
): FluentEmojiComponent => {
  return (props = {}) => {
    const {title, ...rest} = props;
    return jsx('svg', {
      ...attrs,
      role: 'img',
      'aria-hidden': title ? undefined : 'true',
      'aria-label': title as string | undefined,
      dangerouslySetInnerHTML: html,
      ...rest,
    });
  };
};
