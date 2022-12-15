
import { accountInboxReviewsPageProps, PagePropsInterface } from "../../../data/pageProps";
import MainLayout from "../../../layouts/main/MainLayout";

interface IProps {
  pageProps: PagePropsInterface
}

function AccountInboxReviewsPage(props: IProps) {
  const { pageProps } = props;

  return (
    <MainLayout pageProps={pageProps}>
      <div className="my-container">
        ASd
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      pageProps: accountInboxReviewsPageProps,
    },
  }
}

export default AccountInboxReviewsPage;