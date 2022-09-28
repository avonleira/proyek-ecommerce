import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { topSubNavItems, bestSubCatItems } from "../../data/headerData";
import { getRandomSearchKeyword } from "../../utils/textHelper";

interface IProps {
  className?: string
}

function MainHeader(props: IProps) {
  const [openCatBar, setOpenCatBar] = useState<boolean>(false);
  const [bestSubCat, setBestSubCat] = useState<typeof bestSubCatItems>([]);

  const searchFormHook = useForm();

  const InputSearchProps = {
    type: "text", placeholder: "Cari "+getRandomSearchKeyword(), required: true,
    ...searchFormHook.register("keywords"),
  }

  const searchFromSubmit = async (data: any) => {
    console.log(data)
  }

  useEffect(() => {
    const fetchBestSubCat = async () => {
      setBestSubCat(bestSubCatItems);
    }

    fetchBestSubCat();
  }, [])

  return (
    <header className={`${props.className}`}>
      <div className={`bg-white fixed w-full ${openCatBar?"border-b":"shadow-lg"}`}>
        <div className="hidden md:block bg-gray-200 py-0.5">
          <nav id="header-nav-top" className="w-full max-w-7xl mx-auto px-4">
            <div className="flex flex-row justify-between">
              <div className="text-sm">
                Social Link
              </div>
              <ul className="flex flex-row gap-3 text-sm">
                { topSubNavItems?.map((item, index) => (
                  <li key={`header-top-sub-nav-${index}`}>
                    <Link href={item.path}><a className="text-gray-600 hover:text-primary-400">{item.label}</a></Link>
                  </li>
                )) }
              </ul>
            </div>
          </nav>
        </div>
        <nav id="header-nav-main" className="max-w-7xl mx-auto px-4 py-2">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12 md:col-span-2">
              <h1><Link href="/"><a className="brand-logo">Duta Tech</a></Link></h1>
            </div>
            <div className="hidden md:block md:col-span-1">
              <div className="w-full h-full flex flex-col justify-start items-center pt-2">
                <button className={`btn btn-sm ${openCatBar?"bg-gray-200 text-primary-500":"btn-primary-text"} px-4`} onClick={() => { setOpenCatBar(!openCatBar) }}>Kategori</button>
              </div>
            </div>
            <div className="hidden md:block md:col-span-6 pt-1">
              <div className="w-full mb-1">
                <form className="flex flex-row" onSubmit={searchFormHook.handleSubmit(searchFromSubmit)}>
                  <input {...InputSearchProps} className="form-input !rounded-r-none !border-r-0 peer py-1"/>
                  <button type="submit" className="form-input-search-btn px-3 py-1">Cari</button>
                </form>
              </div>
              <ul className="flex flex-row items-center gap-2">
                { bestSubCat?.map((item, index) => (
                  <li key={`best-sub-cat-${index}`}>
                    <Link href={item.link}><a className="text-xs text-slate-600 hover:text-primary-400">{item.label}</a></Link>
                  </li>
                )) }
              </ul>
            </div>
            <div className="hidden md:block md:col-span-3">
              <div className="w-full h-full flex flex-col justify-start items-end pt-2">
                <Link href="/auth/login">
                  <a className="btn btn-sm btn-primary-outline">Login</a>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default MainHeader;