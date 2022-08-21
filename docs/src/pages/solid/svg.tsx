import DeviconsReactOriginal from 'devicons-react/lib/icons/DeviconsReactOriginal';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import Regular from '@/components/Main';
import RegularData from '@/data/build.data.regular.json';
import { Banner, Card, CardInfo, CardTitle } from '@/style/style';
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

const SVG: NextPage = () => {
  const cdn = `<!-- fluentui emoji / jsdelivr-->
<img src="https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/icons/solid/ICON_SVG_NAME.svg" />

<!-- OR -->

<!-- fluentui emoji / unpkg -->
<img src="https://unpkg.com/fluentui-emoji@latest/icons/solid/ICON_SVG_NAME.svg" />
`;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <section>
          <Banner>
            <DeviconsReactOriginal width={'3rem'} height={'3rem'} />
            <h1>
              Fluentui Emoji <span>Solid / SVG</span>
            </h1>
          </Banner>

          <Card>
            <CardInfo>
              <CardTitle>Usage</CardTitle>
            </CardInfo>
            <Highlight language={'xml'} code={cdn} />
          </Card>
        </section>
        <DynamicMain icons={RegularData} type={'solid'} iconType={'svg'} />
      </Suspense>
    </>
  );
};

export default SVG;
