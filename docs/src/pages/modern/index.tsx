import DeviconsReactOriginal from 'devicons-react/lib/icons/DeviconsReactOriginal';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import Main from '@/components/Main';
import ModernData from '@/data/build.data.modern.json';
import { Banner, Card, CardInfo, CardTitle } from '@/style/style';
import Highlight from '@/ui/highlight';

const DynamicMain = dynamic(() => import('@/components/Main'), {
  loading: () => <Main icons={ModernData} />,
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
<img src="https://cdn.jsdelivr.net/npm/fluentui-emoji@latest/icons/modern/ICON_SVG_NAME.svg" />

<!-- OR -->

<!-- fluentui emoji / unpkg -->
<img src="https://unpkg.com/fluentui-emoji@latest/icons/modern/ICON_SVG_NAME.svg" />
`;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <section>
          <Banner>
            <DeviconsReactOriginal width={'3rem'} height={'3rem'} />
            <h1>
              Fluentui Emoji <span>Modern / SVG</span>
            </h1>
          </Banner>

          <Card>
            <CardInfo>
              <CardTitle>Usage</CardTitle>
            </CardInfo>
            <Highlight language={'xml'} code={cdn} />
          </Card>
        </section>
        <DynamicMain icons={ModernData} type={'modern'} iconType={'svg'} />
      </Suspense>
    </>
  );
};

export default SVG;
