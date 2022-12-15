import Link from "next/link"
import MyNextHead from "../../components/MyNextHead"
import { PagePropsInterface } from "../../data/pageProps"

interface IProps {
  pageProps?: PagePropsInterface
  className?: string
  bodyNoMinHeight?: boolean
  noPaddingTop?: boolean
  children?: JSX.Element | any
}

function CheckoutLayout(props: IProps) {

  const getCopyrightYear = (): string => {
    let result = "2022"
    if (result != new Date().getFullYear().toString()) result += `-${new Date().getFullYear()}`;
    return result;
  }

  return (
    <div className={` ${props.className}`}>
      <MyNextHead pageProps={props.pageProps} />
      <header className="bg-white fixed w-full shadow-lg">
        <nav id="header-nav-checkout" className="my-container py-2">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12 md:col-span-2">
              <h1><Link href="/"><a className="brand-logo">Duta Tech</a></Link></h1>
            </div>
          </div>
        </nav>
      </header>
      
      <main className={`${props.bodyNoMinHeight?"":"min-h-screen"} ${props.noPaddingTop?"":"pt-12 md:pt-16"}`}>
        {props.children}
      </main>

      <footer className="w-full border-t py-4 md:py-8">
        <div id="footer-bot" className="w-full flex flex-col items-center justify-center">
          <h1><Link href="/"><a className="brand-logo">Duta Tech</a></Link></h1>
          <p className="text-xs md:text-sm text-zinc-500">
            &copy; {getCopyrightYear()} Manusia Manusia Kuat
          </p>
        </div>
      </footer>
    </div>
  )
}

export default CheckoutLayout