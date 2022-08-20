import DeviconsReactOriginal from 'devicons-react/lib/icons/DeviconsReactOriginal';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import Regular from '@/components/Main';
import RegularData from '@/data/build.data.regular.json';
import { Banner , Card, CardInfo, CardTitle } from '@/style/style';
import Highlight from '@/ui/highlight';

const DynamicMain = dynamic(() => import('@/components/Main'), {
  loading: () => <Regular icons={RegularData} />,
  suspense: true,
});

const Loading: NextPage = () => {
  return (
    <>
      <h1>Loading...</h1>
    </>
  );
};

const Unicode: NextPage = () => {
  const cdn = '';

  return (
    <>
      <Suspense fallback={<Loading />}>
        <section>
          <Banner>
            <DeviconsReactOriginal width={'3rem'} height={'3rem'} />
            <h1>
              Fluentui Emoji <span>Regular / Unicode</span>
            </h1>
          </Banner>

          <Card>
            <CardInfo>
              <CardTitle>Usage</CardTitle>
            </CardInfo>
            <Highlight language={'xml'} code={cdn} />
          </Card>
        </section>
        <DynamicMain
          icons={RegularData}
          type={'regular'}
          iconType={'unicode'}
        />
      </Suspense>
    </>
  );
};

export default Unicode;
