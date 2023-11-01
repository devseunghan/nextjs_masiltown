import Head from 'next/head'
import ContentBlock from '../components/ContentBlock'
import MiddleBlock from '../components/MiddleBlock'
import ScrollToTop from '../components/ScrollToTop'

import IntroContent from "../content/IntroContent.json";
import MiddleBlockContent from "../content/MiddleBlockContent.json";
import AboutContent from "../content/AboutContent.json";
import MissionContent from "../content/MissionContent.json";
import ProductContent from "../content/ProductContent.json";
import LandingContainer from '../components/LandingContainer'

export default function Home() {
  return (
    <>
      <Head>
        <title>마실타운</title>
        <meta name="description" content="모든 전공이 참여하는 커피모임, 마실타운" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LandingContainer>
        <ScrollToTop />
        <ContentBlock
          type="right"
          title={IntroContent.title}
          content={IntroContent.text}
          button={IntroContent.button}
          icon="developer.svg"
          id="intro"
        />
        <MiddleBlock
          title={MiddleBlockContent.title}
          content={MiddleBlockContent.text}
          button={MiddleBlockContent.button}
        />
        <ContentBlock
          type="left"
          title={AboutContent.title}
          content={AboutContent.text}
          section={AboutContent.section}
          icon="graphs.svg"
          id="about"
        />
        <ContentBlock
          type="right"
          title={MissionContent.title}
          content={MissionContent.text}
          icon="product-launch.svg"
          id="mission"
        />
        <ContentBlock
          type="left"
          title={ProductContent.title}
          content={ProductContent.text}
          icon="waving.svg"
          id="product"
        />
      </LandingContainer>
    </>
  )
}