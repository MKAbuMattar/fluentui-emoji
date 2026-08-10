import {createElement, forwardRef, type SVGProps} from 'react';

export type FluentEmojiProps = Omit<
  SVGProps<SVGSVGElement>,
  'children' | 'dangerouslySetInnerHTML'
> & {
  /** Accessible label. Without it the emoji is aria-hidden (decorative). */
  title?: string;
};

export type FluentEmojiComponent = React.ForwardRefExoticComponent<
  FluentEmojiProps & React.RefAttributes<SVGSVGElement>
>;

/** Factory used by the generated icon modules — not meant for direct use. */
export const createFluentEmoji = (
  displayName: string,
  attrs: Record<string, string>,
  html: string,
): FluentEmojiComponent => {
  const Component = forwardRef<SVGSVGElement, FluentEmojiProps>(
    ({title, ...props}, ref) =>
      createElement('svg', {
        ...attrs,
        role: 'img',
        'aria-hidden': title ? undefined : true,
        'aria-label': title,
        ref,
        dangerouslySetInnerHTML: {__html: html},
        ...props,
      }),
  );
  Component.displayName = displayName;
  return Component;
};
