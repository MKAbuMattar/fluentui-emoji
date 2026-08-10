import {type Component, type JSX, splitProps} from 'solid-js';

export type FluentEmojiProps = JSX.SvgSVGAttributes<SVGSVGElement> & {
  /** Accessible label. Without it the emoji is aria-hidden (decorative). */
  title?: string;
};

export type FluentEmojiComponent = Component<FluentEmojiProps>;

/** Factory used by the generated icon modules — not meant for direct use. */
export const createFluentEmoji = (
  name: string,
  attrs: Record<string, string>,
  html: string,
): FluentEmojiComponent => {
  const Component: FluentEmojiComponent = (props) => {
    const [local, rest] = splitProps(props, ['title']);
    return (
      <svg
        {...attrs}
        role="img"
        aria-hidden={local.title ? undefined : 'true'}
        aria-label={local.title}
        innerHTML={html}
        {...rest}
      />
    );
  };
  return Component;
};
