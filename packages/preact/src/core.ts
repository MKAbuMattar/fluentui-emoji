import {type FunctionComponent, h, type JSX} from 'preact';

export type FluentEmojiProps = Omit<
  JSX.SVGAttributes<SVGSVGElement>,
  'dangerouslySetInnerHTML'
> & {
  /** Accessible label. Without it the emoji is aria-hidden (decorative). */
  title?: string;
};

export type FluentEmojiComponent = FunctionComponent<FluentEmojiProps>;

/** Factory used by the generated icon modules — not meant for direct use. */
export const createFluentEmoji = (
  displayName: string,
  attrs: Record<string, string>,
  html: string,
): FluentEmojiComponent => {
  const Component: FluentEmojiComponent = ({title, ...props}) =>
    h('svg', {
      ...attrs,
      role: 'img',
      'aria-hidden': title ? undefined : 'true',
      'aria-label': title,
      dangerouslySetInnerHTML: {__html: html},
      ...props,
    });
  Component.displayName = displayName;
  return Component;
};
