import Link from "next/link";

import MainLayout from "../layouts/main/MainLayout";
import { PagePropsInterface, privacyPolicyPageProps } from "../data/pageProps";
import { privacyPolicy } from "../data/staticData";

interface IProps {
  pageProps: PagePropsInterface
  privacyPolicy: typeof privacyPolicy
}

const PrivacyPolicyPage = (props: IProps) => {
  const { pageProps, privacyPolicy } = props;

  return (
    <MainLayout pageProps={pageProps} noPaddingTop>
      <div id="privpol-header-section" className="bg-primary-100 text-center pt-20 md:pt-36 pb-10">
        <div className="my-container">
          <Link href={"/"}>
            <a className="flex flex-row items-center justify-center gap-2 hover:text-primary-500 mb-2">
              <i className="bi bi-arrow-left" />
              <span className="text-sm">{"KEMBALI KE HALAMAN UTAMA"}</span>
            </a>
          </Link>
          <h1 className="text-3xl font-semibold">{"Kebijakan & Privasi"}</h1>
          <h2 className="text-neutral-500">{"Kebijakan dan Privasi Pengguna Duta Tech"}</h2>
        </div>
      </div>

      <div className="py-6 md:py-8">
        <div id="privpol-content-section" className="my-container">
          <div className="prose max-w-full text-justify" dangerouslySetInnerHTML={{ __html: String(privacyPolicy.content) }} />
        </div>
      </div>
      
    </MainLayout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      pageProps: privacyPolicyPageProps,
      privacyPolicy: privacyPolicy,
    },
  }
}

export default PrivacyPolicyPage;