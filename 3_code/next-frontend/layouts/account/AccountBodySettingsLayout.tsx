import Link from 'next/link';
import { useAuth } from '../../hooks/authHook';

interface IProps {
  activeMenuIndex: number
  children?: JSX.Element | any
}

function AccountBodySettingsLayout(props: IProps) {
  const { activeMenuIndex, children } = props;
  const { userNow } = useAuth();
  const settingsMenu = [
    { label: "Profil", path: "/account/settings" },
    { label: "Daftar Alamat", path: "/account/settings/address" },
    { label: "Pembayaran", path: "/account/settings/payment" },
  ]

  return (
    <div className="mb-4">
      <div className="flex flex-row gap-2 items-center text-neutral-500 hover:text-primary-500 cursor-default duration-75 mb-2">
        <i className="bi bi-person-fill text-3xl" />
        <p className="text-lg font-medium">{userNow?.first_name} {userNow?.last_name}</p>
      </div>

      <div className="w-full border-2 rounded-lg">
        <div className="border-b-2 flex flex-row unselectable">
          { settingsMenu?.map((item, index) => (
            <Link key={`account-body-settings-layout-menu-item-${index}`} href={item.path}>
              <a className={`py-3 px-6 border-b-2 font-semibold ${activeMenuIndex===index?"text-primary-500 border-primary-500":"text-neutral-400 border-hidden hover:text-black"}`}>
                {item.label}
              </a>
            </Link>
          )) }
        </div>
        <div className="p-2">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AccountBodySettingsLayout;