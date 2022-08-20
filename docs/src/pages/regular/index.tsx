import DeviconsReactOriginal from 'devicons-react/lib/icons/DeviconsReactOriginal';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import Main from '@/components/Main';
import RegularData from '@/data/build.data.regular.json';
import { Banner, Card, CardInfo, CardTitle } from '@/style/style';
import Highlight from '@/ui/highlight';

const DynamicMain = dynamic(() => import('@/components/Main'), {
  loading: () => <Main icons={RegularData} />,
  suspense: true,
});

const Loading: NextPage = () => {
  return (
    <>
      <h1>Loading...</h1>
    </>
  );
};

const Fonticons: NextPage = () => {
  const cdn = `<!-- in your header -->
<!-- fluentui emoji / jsdelivr-->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/styles/regular/fluentui-emoji.css">

<!-- OR -->

<!-- fluentui emoji / unpkg -->
<link rel="stylesheet" href="https://unpkg.com/fluentui-emoji@latest/styles/regular/fluentui-emoji.css">


<!-- in your body -->
<i class="fluentui-emoji-regular-1st-place-medal"></i>`;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <section>
          <Banner>
            <DeviconsReactOriginal width={'3rem'} height={'3rem'} />
            <h1>
              Fluentui Emoji <span>Regular / Fonticons</span>
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
          iconType={'fonticons'}
        />
      </Suspense>
    </>
  );
};

export default Fonticons;
