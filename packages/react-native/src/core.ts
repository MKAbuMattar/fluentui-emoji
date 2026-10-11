import {type ComponentType, createElement} from 'react';
import {SvgXml, type XmlProps} from 'react-native-svg';

export type FluentEmojiProps = Omit<XmlProps, 'xml'> & {
  /** Accessible label. Without it the emoji is hidden from screen readers. */
  title?: string;
};

export type FluentEmojiComponent = ComponentType<FluentEmojiProps>;

/** Factory used by the generated icon modules — not meant for direct use. */
export const createFluentEmoji = (
  displayName: string,
  xml: string,
): FluentEmojiComponent => {
  const Component: FluentEmojiComponent = ({title, ...props}) =>
    createElement(SvgXml, {
      xml,
      accessible: Boolean(title),
      accessibilityLabel: title,
      width: 24,
      height: 24,
      ...props,
    });
  (Component as {displayName?: string}).displayName = displayName;
  return Component;
};
