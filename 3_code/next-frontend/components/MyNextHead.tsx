import Head from "next/head"

import { PagePropsInterface } from "../data/pageProps"

interface IProps {
  pageProps: PagePropsInterface
}

function MyNextHead(props: IProps) {
  return (
    <Head>
      <title>{props.pageProps?.title ?? "Duta Tech"}</title>
      { props.pageProps?.metas?.map((item, index) => (
        <meta key={`page-meta-${index}`} name={item.name} content={item.content}/>
      )) }
    </Head>
  )
}

export default MyNextHead;