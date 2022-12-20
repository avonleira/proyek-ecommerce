import Link from "next/link";
import { useState } from "react";

import { useAuth } from "../../hooks/authHook";

interface IProps {
  bodyType: "settings-profile"|"settings-address"|"settings-payment"
  children?: JSX.Element | any
}

function AccountBodyLayout(props: IProps) {
  const { bodyType, children } = props;
  const { userNow, LogoutBackend } = useAuth();
  const [inboxMenuOpen, setInboxMenuOpen] = useState<boolean>(true);
  const [shopMenuOpen, setShopMenuOpen] = useState<boolean>(true);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(true);
  
  const inboxMenu = [
    { label: "Diskusi Produk", path: "/account/inbox/discussion" },
    { label: "Ulasan", path: "/account/inbox/reviews" },
  ]
  const shopMenu = [
    { label: "Menunggu Pembayaran", path: "/account/payment-list" },
    { label: "Daftar Transaksi", path: "/account/order-list" },
  ]
  const userMenu = [
    { label: "Wishlist", path: "/account/wishlist" },
    { label: "Pengaturan", path: "/account/settings" },
  ]

  return (
    <div className="my-container py-8 grid grid-cols-12 gap-8">
      <div className="col-span-3 pt-3">
        <div className="rounded-md shadow-md">
          <div className="p-3 border-b flex flex-row items-center gap-2">
            <img src={userNow?.profile_picture} alt="..." className="aspect-square w-auto h-12" />
            <div className="text-sm font-semibold">
              <p className="">{userNow?.first_name} {userNow?.last_name}</p>
              <p className="text-primary-500 text-xs">{userNow?.phone_number??"Duta Tech Premium"}</p>
            </div>
          </div>

          <div className="p-2 border-b">
            <div className="flex flex-row items-center justify-between cursor-default group mb-1.5" onClick={() => setInboxMenuOpen(!inboxMenuOpen)}>
              <p className="text-sm font-semibold">Kotak Masuk</p>
              <i className={`bi bi-caret-down-fill text-black text-xs group-hover:text-primary-500 ${inboxMenuOpen?"rotate-180":""}`} />
              {/* <i className={`bi bi-caret-${inboxMenuOpen?"up":"down"}-fill text-black text-xs group-hover:text-primary-500`} /> */}
              {/* <div className="rounded-full bg-neutral-300 w-6 h-6 text-center"></div> */}
            </div>
            <div className={`text-sm gap-1 cursor-default ${inboxMenuOpen?"flex flex-col":"hidden"}`}>
              { inboxMenu?.map((item, index) => (
                <Link key={`account-body-layout-inbox-menu-${index}`} href={item.path}>
                  <a className="px-2 rounded hover:bg-primary-200">{item.label}</a>
                </Link>
              )) }
            </div>
          </div>

          <div className="p-2 border-b">
            <div className="flex flex-row items-center justify-between cursor-default group mb-1.5" onClick={() => setShopMenuOpen(!shopMenuOpen)}>
              <p className="text-sm font-semibold">Pembelian</p>
              <i className={`bi bi-caret-down-fill text-black text-xs group-hover:text-primary-500 ${shopMenuOpen?"rotate-180":""}`} />
            </div>
            <div className={`text-sm gap-1 cursor-default ${shopMenuOpen?"flex flex-col":"hidden"}`}>
              { shopMenu?.map((item, index) => (
                <Link key={`account-body-layout-shop-menu-${index}`} href={item.path}>
                  <a className="px-2 rounded hover:bg-primary-200">{item.label}</a>
                </Link>
              )) }
            </div>
          </div>

          <div className="p-2 border-b">
            <div className="flex flex-row items-center justify-between cursor-default group mb-1.5" onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <p className="text-sm font-semibold">Profil Saya</p>
              <i className={`bi bi-caret-down-fill text-black text-xs group-hover:text-primary-500 ${userMenuOpen?"rotate-180":""}`} />
            </div>
            <div className={`text-sm gap-1 cursor-default ${userMenuOpen?"flex flex-col":"hidden"}`}>
              { userMenu?.map((item, index) => (
                <Link key={`account-body-layout-user-menu-${index}`} href={item.path}>
                  <a className="px-2 rounded hover:bg-primary-200">{item.label}</a>
                </Link>
              )) }
            </div>
          </div>
          
          <div className="p-1">
            <div className="p-1 rounded flex flex-row items-center gap-2 hover:bg-primary-200 cursor-pointer" onClick={() => LogoutBackend()}>
              <i className="bi bi-door-open-fill text-lg" />
              <p className="">Keluar</p>
            </div>
          </div>

        </div>
      </div>
      <div className="col-span-9">
        {children}
      </div>
    </div>
  )
}

export default AccountBodyLayout;