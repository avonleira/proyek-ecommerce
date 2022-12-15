
import Link from "next/link";
import { Fragment, useState } from "react";

import { cartCheckoutPageProps, PagePropsInterface } from "../../data/pageProps";
import CheckoutLayout from "../../layouts/checkout/CheckoutLayout";
import { range } from "../../utils/mathHelper";
import MyNumberFormat from "../../utils/numberFormater";

interface IProps {
  pageProps: PagePropsInterface
}

function CartCheckoutPage(props: IProps) {
  const { pageProps } = props;

  return (
    <CheckoutLayout pageProps={pageProps}>
      <div className="my-container pt-6 pb-16">
        <h1 className="text-xl font-semibold mb-8">Checkout</h1>
        <div className="grid grid-cols-12 gap-4 md:gap-8">
          <div className="col-span-8">
            <p className="text-sm font-semibold mb-4">Alamat Pengiriman</p>
            <div className="border-y py-4">
              <div className="flex flex-row items-center gap-1 text-sm">
                <p className="font-semibold">Nama Penerima</p>
                <p className="">(Alias Alamat)</p>
                { true ? (
                  <span className="rounded bg-primary-100 text-primary-500 text-xs py-0.5 px-2 font-semibold">Utama</span>
                ) : null }
              </div>
              <p className="text-sm">Nomor Telepon</p>
              <p className="text-sm text-neutral-500">Alamat Lengkap</p>
            </div>
            <div className="py-4 border-b-4 flex flex-row items-center gap-2">
              <button className="btn btn-primary-outline text-sm font-semibold">Pilih Alamat Lain</button>
            </div>

            <div className="py-4 border-b-4">
              <p className="text-sm font-semibold mb-4">Detail Pengiriman</p>
              <p>Pokoknya di sini pilih kurirnya</p>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  L
                </div>
                <div className="col-span-6">
                  R
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              { range({max: 3}).map((index) => (
                <CheckoutItemCard2 key={`cart-checkout-item-${index}`} index={index} />
              )) }
            </div>
          </div>
          <div className="col-span-4">
            <div className="rounded-md shadow-md border sticky top-24 max-w-full">
              <div className="p-3 border-b-4">
                <div className="rounded-md border p-3 cursor-pointer flex flex-row items-center gap-2 text-neutral-500">
                  <i className="bi bi-tags text-lg text-primary-500" />
                  <p className="text-sm grow font-semibold">Makin Hemat Pakai Promo</p>
                  <i className="bi bi-arrow-right text-lg" />
                </div>
              </div>
              <div className="p-3">
                <p className="font-semibold mb-3">Ringkasan Belanja</p>
                <div className="pb-3 border-b-2">
                  <div className="flex flex-row items-center justify-between gap-2 text-sm text-neutral-500">
                    <p className="">{`Total Harga (${3} Produk)`}</p>
                    <p className="">
                      <MyNumberFormat value={55000} />
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-2 text-sm text-neutral-500">
                    <p className="">{`Biaya Proteksi Produk (${1} Proteksi)`}</p>
                    <p className="">
                      <MyNumberFormat value={3000} />
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between gap-2 py-4 font-semibold">
                  <p className="">Total Tagihan</p>
                  <p className="">
                    <MyNumberFormat value={55000-10000} />
                  </p>
                </div>
                <p className="text-xs text-justify mb-4">
                  {"Dengan mengaktifkan asuransi, Saya menyetujui "}
                  <Link href="/terms-conditions"><a className="text-primary-500">syarat dan ketentuan</a></Link>
                  {" yang berlaku."}
                </p>
                <button className="btn btn-primary w-full font-semibold">Pilih Pembayaran</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CheckoutLayout>
  )
}

interface ICheckoutItemCard2Props {
  index: number
}
function CheckoutItemCard2(props: ICheckoutItemCard2Props) {
  const { index } = props;
  const [subtotalOpen, setSubtotalOpen] = useState<boolean>(false);

  return (
    <div className="pt-2 pb-2 border-b-4">
      <p className="font-semibold text-neutral-500 mb-4">{`Pesanan ${index+1}`}</p>
      <div className="grid grid-cols-11 pb-4 border-b">
        <div className="col-span-6">
          <div className="flex flex-row gap-4 mb-6">
            <img src="https://images.tokopedia.net/img/cache/100-square/VqbcmM/2022/10/3/60ac6793-4f84-43b5-a76d-4bbce696d711.png.webp?ect=4g" alt="..." className="aspect-square w-16 h-auto rounded-md" />
            <div className="grow">
              <div className="mb-1">Nama Barang</div>
              <div className="flex flex-row gap-2 items-center text-xs">
                <p className="">Tipe Barang</p>
                <p className="">{`1 Barang (${30} gr)`}</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <p className="text-sm line-through text-neutral-500"><MyNumberFormat value={25000} /></p>
                <p className="font-semibold"><MyNumberFormat value={15000} /></p>
              </div>
            </div>
          </div>
          <div className="text-xs text-neutral-500">Catatan: </div>
        </div>
      </div>
      <div className="pt-2 flex flex-row items-center justify-between gap-1">
        <p className="font-semibold">Subtotal</p>
        <p className="font-semibold"><MyNumberFormat value={20000} /></p>
      </div>
    </div>
  )
}

interface ICheckoutItemCardProps {
  index: number
}
function CheckoutItemCard(props: ICheckoutItemCardProps) {
  const { index } = props;
  const [subtotalOpen, setSubtotalOpen] = useState<boolean>(false);

  return (
    <div className="pt-2 pb-2 border-b-4">
      <p className="font-semibold text-neutral-500 mb-4">{`Pesanan ${index+1}`}</p>
      <div className="grid grid-cols-11 pb-4 border-b">
        <div className="col-span-6">
          <div className="flex flex-row gap-4 mb-6">
            <img src="https://images.tokopedia.net/img/cache/100-square/VqbcmM/2022/10/3/60ac6793-4f84-43b5-a76d-4bbce696d711.png.webp?ect=4g" alt="..." className="aspect-square w-16 h-auto rounded-md" />
            <div className="grow">
              <div className="mb-1">Nama Barang</div>
              <div className="flex flex-row gap-2 items-center text-xs">
                <p className="">Tipe Barang</p>
                <p className="">{`1 Barang (${30} gr)`}</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <p className="text-sm line-through text-neutral-500"><MyNumberFormat value={25000} /></p>
                <p className="font-semibold"><MyNumberFormat value={15000} /></p>
              </div>
            </div>
          </div>
          <div className="text-xs text-neutral-500">Catatan: </div>
        </div>
        <div className="col-span-5">
          <p className="text-sm font-semibold mb-1">Pilih Durasi</p>
          <button className="btn btn-primary w-full flex flex-row gap-2 items-center">
            <span className="text-sm font-semibold grow">Pengiriman</span>
            <i className="bi bi-chevron-down text-lg" />
          </button>
        </div>
      </div>
      <div className="pt-2 flex flex-row items-center justify-between gap-1">
        <p className="font-semibold">Subtotal</p>
        <div className="flex flex-row items-center gap-1 cursor-pointer" onClick={() => setSubtotalOpen(!subtotalOpen)}>
          <p className="font-semibold"><MyNumberFormat value={20000} /></p>
          <i className={`bi bi-caret-down-fill text-neutral-500 ${subtotalOpen?"rotate-180":""}`} />
        </div>
      </div>
      { subtotalOpen ? (
        <Fragment>
          <div className="flex flex-row items-center justify-between gap-1 text-sm">
            <p className="text-neutral-500">{`Harga (${1} barang)`}</p>
            <p className="font-semibold"><MyNumberFormat value={15000} /></p>
          </div>
          <div className="flex flex-row items-center justify-between gap-1 text-sm">
            <p className="text-neutral-500">Ongkos Kirim</p>
            <p className="font-semibold"><MyNumberFormat value={5000} /></p>
          </div>
          <div className="flex flex-row items-center justify-between gap-1 text-sm">
            <p className="text-neutral-500">Asuransi Pengiriman</p>
            <p className="font-semibold"><MyNumberFormat value={0} /></p>
          </div>
        </Fragment>
      ) : null }
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      pageProps: cartCheckoutPageProps,
    },
  }
}

export default CartCheckoutPage;