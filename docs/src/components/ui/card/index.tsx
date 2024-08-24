import Image from 'next/image';
import React, { FC } from 'react';

import { UseNotification } from '@/components/ui/notifications';
import Item from '@/types/item';
import Highlight from '@/ui/highlight';

import { Card, CardInfo, CardTitle } from './style';

type Props = {
  item: Item;
  language: string;
  type?: 'high-contrast' | 'flat' | 'modern';
  iconType?: 'fonticons' | 'unicode' | 'svg';
};

type IconComponentProps = {
  item: Item;
  type?: 'high-contrast' | 'flat' | 'modern';
  iconType?: 'fonticons' | 'unicode' | 'svg';
};

const index: FC<Props> = (props) => {
  const {
    item,
    language,
    type = 'high-contrast',
    iconType = 'fonticons',
  } = props;

  const code = (iconType: 'fonticons' | 'unicode' | 'svg') => {
    switch (iconType) {
      case 'fonticons':
        return `<i class="${item.iconName}"></i>`;
      case 'unicode':
        return `\\${item.unicode}`;
      case 'svg':
        return `${item.svg}`;
      default:
        return `<i class="${item.iconName}"></i>`;
    }
  };

  const dispatch = UseNotification();

  const handleNewNotification = (
    type: string,
    message: string,
    title: string,
  ) => {
    dispatch({
      type: type,
      message: message,
      title: title,
    });
  };

  const copyTextToClipboard = async (text: string) => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  };

  const handleCopyClick = () => {
    copyTextToClipboard(code(iconType))
      .then(() => {
        handleNewNotification('SUCCESS', 'Copied to clipboard', 'Success');
      })
      .catch((err) => {
        handleNewNotification('ERROR', err, 'Error');
        console.log(err);
      });
  };

  return (
    <>
      <Card onClick={handleCopyClick}>
        <CardInfo>
          <IconComponent iconType={iconType} type={type} item={item} />
          <CardTitle>{item.name}</CardTitle>
        </CardInfo>
        <Highlight code={code(iconType)} language={language} />
      </Card>
    </>
  );
};

const IconComponent: FC<IconComponentProps> = (props) => {
  const { type = 'regular', iconType = 'fonticons', item } = props;

  const myLoader = ({ src, width, quality }: any) => {
    return `https://cdn.jsdelivr.net/npm/fluentui-emoji@1.0.0/icons/${src}?w=${width}&q=${
      quality || 75
    }`;
  };

  switch (iconType) {
    case 'fonticons':
      return <i className={`${item.iconName} fe-f-4x`}></i>;
    case 'unicode':
      return <i className={`${item.iconName} fe-f-4x`}></i>;
    case 'svg':
      return (
        <Image
          loader={myLoader}
          src={`${type}/${item.svg}`}
          alt={item.name}
          width={56}
          height={56}
        />
      );
    default:
      return <i className={`${item.iconName} emoji`}></i>;
  }
};

export default React.memo(index);
