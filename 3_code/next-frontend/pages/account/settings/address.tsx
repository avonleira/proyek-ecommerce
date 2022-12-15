
import MainLayout from "../../../layouts/main/MainLayout";
import { accountSettingsAddressPageProps, PagePropsInterface } from "../../../data/pageProps";
import AuthMiddleware from "../../../components/middlewares/AuthMiddleware";
import AccountBodyLayout from "../../../layouts/account/AccountBodyLayout";
import AccountBodySettingsLayout from "../../../layouts/account/AccountBodySettingsLayout";
import { range } from "../../../utils/mathHelper";

interface IProps {
  pageProps: PagePropsInterface
}

function AccountSettingsAddressPage(props: IProps) {
  const { pageProps } = props;

  return (
    <AuthMiddleware>
      <MainLayout pageProps={pageProps}>
        <AccountBodyLayout bodyType="settings-address">
          <AccountBodySettingsLayout activeMenuIndex={1}>
            <div className="p-2">
              <div className="flex flex-row justify-end mb-4">
                <button className="btn btn-sm btn-primary">Tambah Alamat</button>
              </div>

              <div className="flex flex-col gap-3">
                { range({max: 6}).map((index) => (
                  <AddressCard key={`account-settings-address-item-${index}`} index={index} />
                )) }
              </div>
            </div>
          </AccountBodySettingsLayout>
        </AccountBodyLayout>
      </MainLayout>
    </AuthMiddleware>
  )
}

interface IAddressCardProps {
  index: number
}
function AddressCard(props: IAddressCardProps) {
  const { index } = props;

  return(
    <div className={`rounded-md p-3 shadow-md ${index===0?"bg-primary-100 border border-primary-500":""}`}>
      <div className="flex flex-row items-center gap-2">
        <p className="text-neutral-500 text-lg font-semibold">Alias Alamat</p>
        { index===0 ? (
          <span className="p-1 text-xs rounded text-neutral-500 bg-neutral-200">Utama</span>
        ) : null }
      </div>
      <p className="text-lg font-semibold">Nama Penerima di Alamat itu</p>
      <p className="">No Telepon Penerima di Alamat itu</p>
      <p className="">Alamat Panjangnya</p>

      <div className="flex flex-row items-center mt-4 text-xs font-semibold">
        <span className="text-primary-500 cursor-pointer pr-2">Ubah Alamat</span>
        { index!==0 ? (
          <>
            <span className="text-primary-500 cursor-pointer px-2 border-l">Jadikan Alamat Utama</span>
            <span className="text-primary-500 cursor-pointer px-2 border-l">Hapus</span>
          </>
        ) : null }
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      pageProps: accountSettingsAddressPageProps,
    },
  }
}

export default AccountSettingsAddressPage;