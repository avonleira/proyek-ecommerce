
import { accountPaymentListPageProps, PagePropsInterface } from "../../data/pageProps";
import MainLayout from "../../layouts/main/MainLayout";

interface IProps {
  pageProps: PagePropsInterface
}

function AccountPaymentListPage(props: IProps) {
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
      pageProps: accountPaymentListPageProps,
    },
  }
}

export default AccountPaymentListPage;