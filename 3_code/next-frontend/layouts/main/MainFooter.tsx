import Link from "next/link";
import { useForm } from "react-hook-form";

import { companyProfile, footerUniversalLinks } from "../../data/staticData";

function MainFooter() {
  const subscribeFormHook = useForm();

  const InputSubscribeProps = {
    type: "text", placeholder: "Masukkan alamat email anda", required: false,
    ...subscribeFormHook.register("email", { required: true, pattern:  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })
  }

  const subscribeFromSubmit = async (data: any) => {
    console.log(data)
  }

  const getCopyrightYear = (): string => {
    let result = "2022"
    if (result != new Date().getFullYear().toString()) result += `-${new Date().getFullYear()}`;
    return result;
  }
  
  return (
    <footer className="w-full border-t py-6 md:py-10">
      <div id="footer-top" className="grid grid-cols-12 md:grid-cols-11 gap-4 my-container pb-8">
        <div className="col-span-6 md:col-span-3">
          <div className="mb-4">
            <h6 className="font-semibold text-lg">Duta Tech</h6>
            <ul className="">
              { footerUniversalLinks?.map((item, index) => (
                <li
                  key={`footer-universal-links-${index}`}
                  className="text-zinc-500 hover:text-primary-500 duration-75 text-sm"
                >
                  <Link href={item.path}>{item.label}</Link>
                </li>
              )) }
            </ul>
          </div>

          <div className="">
            <h6 className="font-semibold text-lg">Kantor Pusat</h6>
            <p className="mb-2 text-sm text-zinc-500">
              {companyProfile.contacts.address.long}
            </p>
            <div className="text-sm text-zinc-500">
              <span><i className="bi bi-telephone-fill"></i></span>
              {" "}{companyProfile.contacts.phone}
            </div>
            <div className="text-sm text-zinc-500">
              <span><i className="bi bi-whatsapp"></i></span>
              {" "}{companyProfile.contacts.whatsApp}
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3">
          <div className="">
            <h6 className="font-semibold text-lg">Mendukung Pembayaran</h6>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5">
          <div className="mb-4">
            <h6 className="font-semibold text-lg">Ikuti Kami</h6>

          </div>

          <div className="">
            <h6 className="font-semibold text-lg">Terus Update</h6>
            <p className="text-sm text-zinc-500 mb-1">Dapatkan update terbaru dari kami melalui email!</p>
            <div className="w-full mb-1">
              <form id="subscribe-form" className="flex flex-row" onSubmit={subscribeFormHook.handleSubmit(subscribeFromSubmit)}>
                <input {...InputSubscribeProps} className="form-input !rounded-none !border-r-0 py-2" />
                <button form="subscribe-form" type="submit" className="form-input-search-btn-contained px-3 py-2">Gabung</button>
              </form>
            </div>
            { subscribeFormHook.formState.errors?.email ? (
              <p className="text-sm text-red-600">Masukan email yang valid!</p>
            ) : null }
          </div>
        </div>
      </div>

      <div id="footer-bot" className="w-full flex flex-col items-center justify-center">
        <h1><Link href="/"><a className="brand-logo">Duta Tech</a></Link></h1>
        <p className="text-xs md:text-sm text-zinc-500">
          &copy; {getCopyrightYear()} Manusia Manusia Kuat
        </p>
      </div>
    </footer>
  )
}

export default MainFooter;

{/* <footer className="flex h-24 w-full items-center justify-center border-t">
  <a
    className="flex items-center justify-center gap-2"
    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    target="_blank"
    rel="noopener noreferrer"
  >
    Powered by{' '}
    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
  </a>
</footer> */}