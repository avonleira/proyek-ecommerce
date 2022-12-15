
import { accountWishlistPageProps, PagePropsInterface } from "../../data/pageProps";
import MainLayout from "../../layouts/main/MainLayout";

interface IProps {
  pageProps: PagePropsInterface
}

function AccountWishlistPage(props: IProps) {
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
      pageProps: accountWishlistPageProps,
    },
  }
}

export default AccountWishlistPage;