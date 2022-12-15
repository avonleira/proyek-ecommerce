import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, MutableRefObject } from "react";
import { useForm } from "react-hook-form";

import { headerTopSubNavItems, headerBestSubCatItems } from "../../data/staticData";
import { useAuth } from "../../hooks/authHook";
import { getRandomSearchKeyword } from "../../utils/textHelper";

interface IProps {
  refElement: MutableRefObject<HTMLElement | null>
  className?: string
  setOpenBackdrop: React.Dispatch<React.SetStateAction<boolean>>
}

function MainHeader(props: IProps) {
  const router = useRouter();
  const { userNow, LogoutBackend } = useAuth();
  // console.log("userNow", userNow)
  const [openCatBar, setOpenCatBar] = useState<boolean>(false);
  const [inputPh, setInputPh] = useState<string>("");
  const [bestSubCat, setBestSubCat] = useState<typeof headerBestSubCatItems>([]);

  const searchFormHook = useForm({
    defaultValues: {
      keywords: router.pathname=="/search"?router.query.q??"":"",
    }
  });

  const InputSearchProps = {
    type: "text", placeholder: inputPh, required: true,
    ...searchFormHook.register("keywords"),
  }

  const searchFromSubmit = async (data: any) => {
    // console.log(data)
    router.push(`/search?q=${data.keywords}`)
  }

  useEffect(() => {
    const fetchBestSubCat = async () => {
      setBestSubCat(headerBestSubCatItems);
    }
    
    setInputPh("Cari "+getRandomSearchKeyword())

    fetchBestSubCat();
  }, [])

  useEffect(() => {
    let result = false;
    if (openCatBar) result = true;
    props.setOpenBackdrop(result);
  }, [openCatBar])

  return (
    <header ref={props.refElement} className={`${props.className??""} relative z-10`} onMouseLeave={() => { setOpenCatBar(false) }}>
      {/* <CategoryPopup show={openCatBar} setShow={setOpenCatBar} /> */}
      <div className={`bg-white fixed w-full`}>
        <div className={`${openCatBar?"border-b":"shadow-lg"}`}>
          <div className="hidden md:block bg-gray-200 py-0.5">
            <nav id="header-nav-top" className="my-container">
              <div className="flex flex-row justify-between">
                <div className="text-sm">
                  Social Link
                </div>
                <ul className="flex flex-row gap-3 text-sm">
                  { headerTopSubNavItems?.map((item, index) => (
                    <li key={`header-top-sub-nav-${index}`}>
                      <Link href={item.path}><a className="text-gray-600 hover:text-primary-400">{item.label}</a></Link>
                    </li>
                  )) }
                </ul>
              </div>
            </nav>
          </div>
          <nav id="header-nav-main" className="my-container py-2">
            <div className="grid grid-cols-12 gap-2">
              {/* COL 1: BRAND LOGO */}
              <div className="col-span-12 md:col-span-2">
                <h1><Link href="/"><a className="brand-logo">Duta Tech</a></Link></h1>
              </div>
              {/* ENC COL 1 */}

              {/* COL 2: CATEGORY BUTTON */}
              <div className="hidden md:block md:col-span-1">
                <div className="w-full h-full flex flex-col justify-start items-center pt-2">
                  <button className={`btn btn-sm ${openCatBar?"bg-gray-200 text-primary-500":"btn-primary-text"} px-4`} /* onClick={() => { setOpenCatBar(!openCatBar) }} */ onMouseEnter={() => { setOpenCatBar(true) }}>Kategori</button>
                </div>
              </div>
              {/* END COL 2 */}

              {/* COL 3: SEARCH BAR */}
              <div className={`hidden md:block ${userNow?"md:col-span-6":"md:col-span-7"} pt-1`}>
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
              {/* END COL 3 */}

              {/* COL 4: TOOLBAR */}
              <div className={`hidden md:block ${userNow?"md:col-span-3":"md:col-span-2"}`}>
                { userNow ? (
                  <div className="w-full flex flex-row flex-wrap justify-start pt-1 gap-1 px-1">
                    <button className="py-1 px-2 rounded text-gray-500 hover:bg-zinc-200" onClick={() => router.push("/cart")}>
                      <i className="bi bi-cart-fill"></i>
                    </button>
                    <button className="py-1 px-2 rounded text-gray-500 hover:bg-zinc-200">
                      <i className="bi bi-bell-fill"></i>
                    </button>
                    <button className="py-1 px-2 rounded text-gray-500 hover:bg-zinc-200">
                      <i className="bi bi-envelope-fill"></i>
                    </button>
                    {/* <div className="h-8 border mx-1"></div> */}
                    <div className="h-8 w-[1.2px] bg-gray-300 mx-1"></div>
                    <button className="flex-1 py-1 px-2 rounded hover:bg-zinc-200 text-left" onClick={() => router.push("/account/settings")}>
                      <div className="flex flex-row items-center gap-2">
                        <img src={userNow.profile_picture} alt="..." className="rounded w-6 h-6" />
                        <span className="text-sm">{userNow.first_name}</span>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="w-full flex flex-row flex-wrap justify-end pt-1 gap-1">
                    <Link href="/auth/login">
                      <a className="btn btn-primary-text py-1 px-2">Masuk</a>
                    </Link>
                    <Link href="/auth/register">
                      <a className="btn btn-primary py-1 px-2">Daftar</a>
                    </Link>
                  </div>
                ) }
              </div>
              {/* END COL 4 */}

            </div>
          </nav>
        </div>

        { openCatBar ? (<CategorySection />) : null }
      </div>
    </header>
  )
}

function CategorySection() {
  return (
    <div className="my-container mx-h-[50vh] py-2">
      <div className="flex flex-row gap-2">
        <div className="flex-none w-52">
          <ul className="overflow-y-auto h-[48vh]">
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
          </ul>
        </div>
        <div className="grow">
          <div className="overflow-y-auto h-[48vh]">
            <ul className="overflow-y-auto h-[48vh]">
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
              <li className="w-full px-4 py-2 rounded hover:bg-zinc-400">Asd</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// interface ICategoryPopup {
//   show: boolean
//   setShow: React.Dispatch<React.SetStateAction<boolean>>
// }

// function CategoryPopup(props: ICategoryPopup) {
//   return (
//     <div
//       className={`${props.show?"":"hidden"} fixed top-0 bottom-0 left-0 right-0 bg-black opacity-50 z-0`}
//       onClick={() => props.setShow(false)}
//     >
//       asd
//     </div>
//   )
// }

export default MainHeader;