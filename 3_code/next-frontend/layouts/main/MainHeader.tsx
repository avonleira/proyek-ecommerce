import Link from "next/link";

import { MainNavBarItems } from "./navItems";

interface IProps {
  className?: string
}

function MainHeader(props: IProps) {
  return (
    <header className={`${props.className}`}>
      <div className="bg-white py-4 fixed w-full shadow-lg">
        <nav id="header-nav" className="max-w-7xl mx-auto px-4 flex flex-row justify-between items-center gap-4 md:gap-8">
          <h1 className="text-center">
            <Link href="/"><a className="brand-logo">Duta Tech</a></Link>
          </h1>
          <ul className="flex-grow hidden md:flex md:flex-row md:items-end gap-4">
            { MainNavBarItems?.map((item, index) => (
              <li key={`nav-link-${index}`}>
                <Link href={item.path??"/"}>
                  <a className="text-primary-400">{item.label}</a>
                </Link>
              </li>
            )) }
          </ul>
          <Link href="/auth/login">
            <a className="btn btn-primary">Login</a>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default MainHeader;