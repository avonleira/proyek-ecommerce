
import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { cartPageProps, PagePropsInterface } from "../../data/pageProps";
import MainLayout from "../../layouts/main/MainLayout";
import { range } from "../../utils/mathHelper";
import MyNumberFormat from "../../utils/numberFormater";
import useDebounce from "../../hooks/useDebounce";

interface IProps {
  pageProps: PagePropsInterface
}

function CartPage(props: IProps) {
  const { pageProps } = props;
  const router = useRouter();

  return (
    <MainLayout pageProps={pageProps}>
      <div className="my-container py-8 grid grid-cols-12 gap-4 md:gap-14">
        <div className="col-span-12 md:col-span-8">
          <h1 className="text-xl font-semibold text-neutral-600 mb-3">Keranjang</h1>
          { false ? (
            <div className="rounded border border-red-500 bg-red-100 p-2 mb-3">
              Alert
            </div>
          ) : null }

          <div className="flex flex-row items-center justify-between gap-4 text-sm py-3 border-b-4">
            <input id="cart-all-cb" type="checkbox" className="form-checkbox cursor-pointer" />
            <div className="grow">
              <label htmlFor="cart-all-cb" className="cursor-pointer unselectable">Pilih Semua</label>
            </div>
            { true ? (
              <div className="text-primary-500 font-semibold cursor-pointer">Hapus</div>
            ) : null }
          </div>

          <div className="flex flex-col">
            { range({max: 3}).map((index) => (
              <CartItemCard key={`cart-item-${index}`} index={index} />
            )) }
          </div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="rounded-md shadow-md border sticky top-36 max-w-full">
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
                  <p className="">{`Total Harga (${3} barang)`}</p>
                  <p className="">
                    <MyNumberFormat value={55000} />
                  </p>
                </div>
                <div className="flex flex-row items-center justify-between gap-2 text-sm text-neutral-500">
                  <p className="">Total Diskon Barang</p>
                  <p className="">
                    -<MyNumberFormat value={10000} />
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between gap-2 py-4 font-semibold">
                <p className="">Total Harga</p>
                <p className="">
                  <MyNumberFormat value={55000-10000} />
                </p>
              </div>
              <button className="btn btn-primary w-full font-semibold" onClick={() => router.push("/cart/checkout")}>{`Beli (${3})`}</button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

interface ICartItemCardProps {
  index: number
}
function CartItemCard(props: ICartItemCardProps) {
  const { index } = props;
  const noteLimit = 144;
  const [addNoteFormOpen, setAddNoteFormOpen] = useState<boolean>(false);
  const addNoteInputRef = useRef<HTMLTextAreaElement>(null);
  const [noteValue, setNoteValue] = useState<string>("");
  const debouncedNoteValue = useDebounce(noteValue, 500);
  const [quantity, setQuantity] = useState<number>(1);

  const InputValueProps = {
    ref: addNoteInputRef, type: "text", value: noteValue,
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
      let newValue = e.target.value;
      if (newValue.length>noteLimit) newValue = newValue.substring(0, 15);
      if (newValue!=noteValue) setNoteValue(newValue);
    },
    onBlur: () => setAddNoteFormOpen(false),
  }

  const InputQuantityProps = {
    type: "number", min: 1,
    value: quantity, 
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setQuantity(Number(e.target.value))
    }, 
  }

  const onChangeQuantity = (tipe: "min"|"plus") => {
    let newQuantity = quantity;
    if (tipe==="min") {
      if (newQuantity-1>0) newQuantity -= 1;
    }
    else if (tipe==="plus") {
      newQuantity += 1;
    }
    setQuantity(newQuantity);
  }

  useEffect(() => {
    if (addNoteFormOpen) addNoteInputRef.current?.focus();
  }, [addNoteFormOpen])

  useEffect(() => {
    // console.log("berubah", debouncedNoteValue)
  }, [debouncedNoteValue])

  return (
    <div className="text-sm pt-3 pb-2 border-b-4">
      <div className="flex flex-row justify-between gap-4">
        <input type="checkbox" className="form-checkbox cursor-pointer" />
        <div className="grow flex flex-row gap-3">
          <Link href={"/cart"}><a>
            <img src="https://images.tokopedia.net/img/cache/100-square/VqbcmM/2022/10/3/60ac6793-4f84-43b5-a76d-4bbce696d711.png.webp?ect=4g" alt="..." className="aspect-square w-16 h-auto rounded-md" />
          </a></Link>
          <div className="grow">
            <div className="mb-1">
              <Link href={"/cart"}>
                <a className="line-clamp-1 w-fit">Nama Barang</a>
              </Link>
            </div>
            <div className="flex flex-row items-center gap-2 mb-2">
              { index===0 ? (
                <Fragment>
                  <span className="rounded bg-red-500 text-white text-xs py-0.5 px-2">10%</span>
                  <span className="line-through">
                    <MyNumberFormat value={25000} />
                  </span>
                </Fragment>
              ) : null }
              <span className="font-semibold">
                <MyNumberFormat value={15000} />
              </span>
            </div>
            <div className="mb-1">
              { !addNoteFormOpen && !!noteValue && noteValue.length ? (
                <div className="text-xs flex flex-row items-center gap-1">
                  <p className="text-neutral-500 line-clamp-1">{noteValue}</p>
                  <span className="text-primary-500 font-semibold cursor-pointer" onClick={() => { setAddNoteFormOpen(true); }}>Ubah</span>
                </div>
              ) : (
                <p className={`cursor-pointer text-primary-500 tex-xs ${addNoteFormOpen?"hidden":""} w-fit`} onClick={() => { setAddNoteFormOpen(true); }}>
                  Tulis Catatan
                </p>
              ) }
              <div className="flex flex-col gap-1 w-64">
                <textarea className={`p-1 text-sm ${addNoteFormOpen?"":"hidden"} focus:outline-primary-500`} {...InputValueProps} />
                { addNoteFormOpen ? (
                  <div className={`text-xs text-end ${noteValue.length>=noteLimit?"text-red-500":""}`}>
                    {`${noteValue.length}/${noteLimit}`}
                  </div>
                ) : null }
              </div>
            </div>
          </div>
          <div className="text-lg font-semibold text-end">
            <MyNumberFormat value={15000*quantity} />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-end gap-4">
        <div className="flex flex-row items-center text-neutral-500 cursor-pointer">
          <p className="text-xs pr-4 border-r-2 hover:text-primary-500">
            { index===0?"Sudah ada di Wishlist":"Pindahkan ke Wishlist" }
          </p>
          <i className="bi bi-trash text-lg px-4 hover:text-red-600" />
        </div>
        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <i className={`bi bi-dash-circle text-base text-neutral-400 hover:text-primary-500`} onClick={() => onChangeQuantity("min")}/>
          <input {...InputQuantityProps} className="w-10 text-center hide-updown-arrow" />
          <i className={`bi bi-plus-circle text-base text-neutral-400 hover:text-primary-500`} onClick={() => onChangeQuantity("plus")}/>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      pageProps: cartPageProps,
    },
  }
}

export default CartPage;