
import AuthMiddleware from "../../../components/middlewares/AuthMiddleware";
import { accountInboxReviewsPageProps, PagePropsInterface } from "../../../data/pageProps";
import AccountBodyLayout from "../../../layouts/account/AccountBodyLayout";
import MainLayout from "../../../layouts/main/MainLayout";

interface IProps {
  pageProps: PagePropsInterface
}

function AccountInboxReviewsPage(props: IProps) {
  const { pageProps } = props;

  return (
    <AuthMiddleware>
      <MainLayout pageProps={pageProps}>
        <AccountBodyLayout bodyType="settings-profile">
          <div className="mb-4">
            <div className="flex flex-row gap-2 items-center text-neutral-500 hover:text-primary-500 cursor-default duration-75 mb-2">
              <i className="bi bi-person-fill text-3xl" />
              <p className="text-lg font-medium">Ulasan</p>
            </div>
          </div>
        </AccountBodyLayout>
      </MainLayout>
    </AuthMiddleware>
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