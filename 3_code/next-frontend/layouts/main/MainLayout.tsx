import Head from 'next/head'
import { useRef } from 'react';

import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

interface IProps {
  pageProps?: {
    title?: string
    links?: {
      rel: string
      href: string
    }[]
    metas?: {
      name: string
      content: string
    }[]
  }
  className?: string
  bodyNoMinHeight?: boolean
  children?: JSX.Element | any
}

function MainLayout(props: IProps) {
  return (
    <div className={` ${props.className}`}>
      <Head>
        <title>{props.pageProps?.title ?? "e-Commerce Project"}</title>
        <link rel="icon" href="/favicon.ico" />
        {props.pageProps?.metas?.map((item, index) => (
          <meta key={`meta-item-${index}`} name={item.name} content={item.content} />
        ))}
        {props.pageProps?.links?.map((item, index) => (
          <link key={`link-item-${index}`} rel={item.rel} href={item.href} />
        ))}
      </Head>
      <MainHeader />
      <main className={`${props.bodyNoMinHeight?"":"min-h-screen"} `}>
      {/* <main className={`pt-[${document?.getElementById("header")?.offsetHeight ?? 100}]`}> */}
        {props.children}
      </main>
      <MainFooter />
    </div>
  )
}

export default MainLayout;