import DeviconsReactOriginal from 'devicons-react/lib/icons/DeviconsReactOriginal';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

// import 'react-tabs/style/react-tabs.css';
import { Banner, Discreption, Installation } from '@/style/style';
import { TabContainer, TabListContainer, TabsContainer } from '@/style/style';
import { Card, CardInfo, CardTitle } from '@/style/style';
import Highlight from '@/ui/highlight';

import ImgBanner from '@/assets/img/banner.webp';

const Home: NextPage = () => {
  const pkg = `#npm
npm install --save fluentui-emoji

#yarn
yarn add fluentui-emoji

#pnpm
pnpm add fluentui-emoji`;

  const cdnHighContrast = `<!-- fluentui emoji / jsdelivr-->
<img src="https://cdn.jsdelivr.net/npm/fluentui-emoji@latest/icons/high-contrast/ICON_SVG_NAME.svg" />

<!-- OR -->

<!-- fluentui emoji / unpkg -->
<img src="https://unpkg.com/fluentui-emoji@latest/icons/high-contrast/ICON_SVG_NAME.svg" />`;

  const cdnFlat = `<!-- fluentui emoji / jsdelivr-->
<img src="https://cdn.jsdelivr.net/npm/fluentui-emoji@latest/icons/flat/ICON_SVG_NAME.svg" />

<!-- OR -->

<!-- fluentui emoji / unpkg -->
<img src="https://unpkg.com/fluentui-emoji@latest/icons/flat/ICON_SVG_NAME.svg" />`;

  const cdnModern = `<!-- fluentui emoji / jsdelivr-->
<img src="https://cdn.jsdelivr.net/npm/fluentui-emoji@latest/icons/modern/ICON_SVG_NAME.svg" />

<!-- OR -->

<!-- fluentui emoji / unpkg -->
<img src="https://unpkg.com/fluentui-emoji@latest/icons/modern/ICON_SVG_NAME.svg" />`;

  return (
    <>
      <section>
        <Banner>
          <DeviconsReactOriginal width={'3rem'} height={'3rem'} />
          <h1>Fluentui Emoji</h1>
        </Banner>
        <Discreption>
          Fluentui Emoji an npm package contains a number of well-known,
          cordial, and contemporary emoji, build into{' '}
          <Link href="https://github.com/microsoft/fluentui-emoji">
            <a target={'__blank'}>@microsoft/fluentui-emoji</a>
          </Link>
          .
        </Discreption>

        <div>
          <img src={ImgBanner.src} width={'80%'} alt="" />
        </div>
      </section>

      <Installation>
        <h2>Installation</h2>

        <TabsContainer>
          <TabListContainer>
            <TabContainer>NPM package</TabContainer>
            <TabContainer>CDN</TabContainer>
          </TabListContainer>

          <TabPanel>
            <Card>
              <CardInfo>
                <CardTitle>Install package</CardTitle>
              </CardInfo>
              <Highlight language={'bash'} code={pkg} />
            </Card>
          </TabPanel>
          <TabPanel>
            <TabsContainer>
              <TabListContainer>
                <TabContainer>High Contrast</TabContainer>
                <TabContainer>Flat</TabContainer>
                <TabContainer>Modern</TabContainer>
              </TabListContainer>

              <TabPanel>
                <Card>
                  <CardInfo>
                    <CardTitle>Using CDN / High Contrast</CardTitle>
                  </CardInfo>
                  <Highlight language={'xml'} code={cdnHighContrast} />
                </Card>
              </TabPanel>
              <TabPanel>
                <Card>
                  <CardInfo>
                    <CardTitle>Using CDN / Flat</CardTitle>
                  </CardInfo>
                  <Highlight language={'xml'} code={cdnFlat} />
                </Card>
              </TabPanel>
              <TabPanel>
                <Card>
                  <CardInfo>
                    <CardTitle>Using CDN / Modern</CardTitle>
                  </CardInfo>
                  <Highlight language={'xml'} code={cdnModern} />
                </Card>
              </TabPanel>
            </TabsContainer>
          </TabPanel>
        </TabsContainer>
      </Installation>
    </>
  );
};

export default Home;
