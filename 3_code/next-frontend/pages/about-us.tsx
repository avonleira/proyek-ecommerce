import MainLayout from "../layouts/main/MainLayout";

import { PagePropsInterface, aboutPageProps } from "../data/pageProps";
import { aboutUs } from "../data/staticData";

interface IProps {
  pageProps: PagePropsInterface
  aboutData: typeof aboutUs
}

const AboutPage = (props: IProps) => {
  const { pageProps, aboutData } = props;
  const { mainBanner, visi, misi, branding } = aboutData;

  return (
    <MainLayout pageProps={pageProps} noPaddingTop>
      <div id="about-us-main-banner-section" className="bg-no-repeat bg-cover" style={{ backgroundImage: `url(${mainBanner.bgImage})` }}>
        <div className="w-full pt-10 md:pt-28 bg-gradient-to-r from-primary-500/95 to-primary-400/80">
          <div className="my-container py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-2 md:col-span-1 text-white">
              <h1 className="text-4xl font-semibold mb-4">{mainBanner.title}</h1>
              <p className="text-justify">{mainBanner.content}</p>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center unselectable">
              <img src={mainBanner.ctaImage} alt="..." className="w-full" />
            </div>
          </div>
        </div>
      </div>

      <div id="about-us-visi-section" className="my-container pt-16">
        <h1 className="text-3xl font-semibold mb-4">{visi.title}</h1>
        <p className="text-justify">{visi.content}</p>
      </div>

      <div id="about-us-misi-section" className="my-container py-12 grid grid-cols-2 gap-x-10 gap-y-4">
        { misi.items?.map((item, index) => (
          <div key={`about-us-misi-items-${index}`} className="col-span-2 md:col-span-1">
            <div className="flex flex-row gap-4">
              <i className={`bi ${item.icon} text-4xl text-primary-500`} />
              <div className="">
                <p className="text-xl font-semibold mb-1">{item.title}</p>
                <p className="text-sm text-justify">{item.description}</p>
              </div>
            </div>
          </div>
        )) }
      </div>

      <div id="about-us-branding-section" className="w-full bg-primary-500">
        <div className="my-container grid grid-cols-2 gap-8">
          <div className="col-span-2 md:col-span-1 py-12">
            <h1 className="text-3xl text-white font-semibold mb-6">{branding.title}</h1>
            {branding.points?.map((item, index) => (
              <div key={`about-us-branding-points-item-${index}`} className="flex flex-row gap-2 mb-2">
                <i className="bi bi-bag-check text-white text-lg" />
                <p className="text-sm text-white text-justify">{item.content}</p>
              </div>
            ))}
          </div>
          <div className="col-span-2 md:col-span-1 unselectable">
            <img src={branding.ctaImage} alt="..." className="w-full h-full" />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      pageProps: aboutPageProps,
      aboutData: aboutUs,
    },
  }
}

export default AboutPage;