import Head from "next/head"

import { PagePropsInterface } from "../data/pageProps"

interface IProps {
  pageProps?: PagePropsInterface
}

function MyNextHead(props: IProps) {
  if (!props.pageProps) return (
    <Head>
      <title>{"Duta Tech"}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <base href="/" />
    </Head>
  )
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <base href="/" />
      <title>{props.pageProps?.title ?? "Duta Tech"}</title>
      { props.pageProps?.metas?.map((item, index) => (
        <meta key={`page-meta-${index}`} name={item.name} content={item.content}/>
      )) }
      { props.pageProps?.links?.map((item, index) => (
        <link key={`page-link-${index}`} rel={item.rel} href={item.href} />
      )) }
    </Head>
  )
}

export default MyNextHead;