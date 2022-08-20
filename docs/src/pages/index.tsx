import DeviconsReactOriginal from 'devicons-react/lib/icons/DeviconsReactOriginal';
import type { NextPage } from 'next';
import Link from 'next/link';
import { Tab, TabList, TabPanel,Tabs } from 'react-tabs';

// import 'react-tabs/style/react-tabs.css';
import { Banner, Discreption, Installation } from '@/style/style';
import { TabContainer,TabListContainer, TabsContainer } from '@/style/style';
import { Card, CardInfo, CardTitle } from '@/style/style';
import Highlight from '@/ui/highlight';

const Home: NextPage = () => {
  const pkg = `#npm
npm install --save fluentui-emoji

#yarn
yarn add fluentui-emoji

#pnpm
pnpm add fluentui-emoji`;

  const cdnRegular = `<!-- in your header -->
<!-- fluentui emoji / jsdelivr-->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/styles/regular/fluentui-emoji.css">

<!-- OR -->

<!-- fluentui emoji / unpkg -->
<link rel="stylesheet" href="https://unpkg.com/fluentui-emoji@latest/styles/regular/fluentui-emoji.css">`;

  const cdnSolid = `<!-- in your header -->
<!-- fluentui emoji / jsdelivr-->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mkabumattar/fluentui-emoji@latest/styles/solid/fluentui-emoji.css">

<!-- OR -->

<!-- fluentui emoji / unpkg -->
<link rel="stylesheet" href="https://unpkg.com/fluentui-emoji@latest/styles/solid/fluentui-emoji.css">`;

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
                <TabContainer>Regular</TabContainer>
                <TabContainer>Solid</TabContainer>
              </TabListContainer>

              <TabPanel>
                <Card>
                  <CardInfo>
                    <CardTitle>Using CDN / Regular</CardTitle>
                  </CardInfo>
                  <Highlight language={'xml'} code={cdnRegular} />
                </Card>
              </TabPanel>
              <TabPanel>
                <Card>
                  <CardInfo>
                    <CardTitle>Using CDN / Solid</CardTitle>
                  </CardInfo>
                  <Highlight language={'xml'} code={cdnSolid} />
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
