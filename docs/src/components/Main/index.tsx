import { type FC, useCallback, useEffect, useState } from 'react';

import type Item from '@/types/item';
import Card from '@/ui/card';

import { Cards, SearchInput, SearchSection } from './style';
import { filterIt } from './utils/filterIt.util';
import initialItems from './utils/initialItems.util';

type Props = {
  icons?: Item[];
  language?: string;
  type?: 'high-contrast' | 'flat' | 'modern';
  iconType?: 'fonticons' | 'unicode' | 'svg';
};

const Index: FC<Props> = (props) => {
  const {
    icons = [],
    language = 'xml',
    type = 'high-contrast',
    iconType = 'fonticons',
  } = props;

  const [items, setItems] = useState(initialItems(icons));

  const filterList = useCallback(({ target }: any) => {
    const searchQuery = target.value.toLowerCase();
    const updatedList = filterIt(searchQuery, initialItems(icons));
    setItems(updatedList);
  }, []);

  useEffect(() => {
    setItems(initialItems(icons));
  }, []);

  return (
    <>
      <SearchSection id="search">
        <SearchInput type="text" placeholder="Search" onChange={filterList} />
      </SearchSection>

      <Cards>
        {items.map((item: Item, index: number) => (
          <Card
            key={index}
            item={item}
            type={type}
            iconType={iconType}
            language={language}
          />
        ))}
      </Cards>
    </>
  );
};

export default Index;
