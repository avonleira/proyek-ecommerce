import Link from "next/link";

import { MainNavBarItems } from "./navItems";

interface IProps {
  className?: string
}

function MainHeader(props: IProps) {
  return (
    <header className={`${props.className}`}>
      <div className="bg-blue-600 py-4 fixed w-full shadow-lg">
        <nav id="header-nav" className="max-w-7xl mx-auto px-4 flex flex-row justify-between items-center gap-4 md:gap-8">
          <Link href="/">
            <a className="text-3xl text-white">
              {"Brand Name"}
            </a>
          </Link>
          <ul className="flex-grow hidden md:flex md:flex-row md:items-end gap-4">
            { MainNavBarItems?.map((item, index) => (
              <li key={`nav-link-${index}`}>
                <Link href={item.path??"/"}>
                  <a className="text-blue-50">{item.label}</a>
                </Link>
              </li>
            )) }
          </ul>
          <Link href="/auth/login">
            <a className="py-1.5 px-6 rounded border border-white text-white hover:bg-blue-700 hover:shadow-lg">Login</a>
          </Link>
        </nav>
      </div>
      <div className="pt-16">
        <div className="bg-blue-500 py-1 pt-2">
          <nav id="header-nav-2" className="max-w-7xl px-4 mx-auto">
            <p className="text-white text-sm">Second Navbar</p>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default MainHeader;