
import MainLayout from "../../../layouts/main/MainLayout";
import { accountSettingsPaymentPageProps, PagePropsInterface } from "../../../data/pageProps";
import AuthMiddleware from "../../../components/middlewares/AuthMiddleware";
import AccountBodyLayout from "../../../layouts/account/AccountBodyLayout";
import AccountBodySettingsLayout from "../../../layouts/account/AccountBodySettingsLayout";

interface IProps {
  pageProps: PagePropsInterface
}

function AccountSettingsPaymentPage(props: IProps) {
  const { pageProps } = props;

  return (
    <AuthMiddleware>
      <MainLayout pageProps={pageProps}>
        <AccountBodyLayout bodyType="settings-payment">
          <AccountBodySettingsLayout activeMenuIndex={2}>
            Asd
          </AccountBodySettingsLayout>
        </AccountBodyLayout>
      </MainLayout>
    </AuthMiddleware>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      pageProps: accountSettingsPaymentPageProps,
    },
  }
}

export default AccountSettingsPaymentPage;