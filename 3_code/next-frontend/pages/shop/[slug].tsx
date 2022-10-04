import { GetStaticPaths, GetStaticProps } from "next";

import { IProduct } from "../../interfaces/dataInterface";
import MainLayout from "../../layouts/main/MainLayout";
import { getProductBySlug, mockProducts } from "../../mocks/products";

interface IProps {
  item: IProduct
}

function ShopDetailPage(props: IProps) {
  const { item } = props;
  // console.log(item);

  return (
    <MainLayout>
      <div className="my-container py-2">
        <div className="bg-blue-300 mb-4 py-1">
          Breadcrumb
        </div>

        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-9 bg-red-300">
            Left Side
            <div className="grid grid-cols-10 gap-4 mb-4">
              <div className="col-span-4 bg-indigo-300">
                Pictures (Sticky)
              </div>
              <div className="col-span-6 bg-yellow-300">
                Item Details
              </div>
            </div>

            <div className="mb-4">
              <p className="mb-2">Ulasan Pembeli</p>
              <div className="grid grid-cols-10 gap-4">
                <div className="col-span-3 bg-amber-300">
                  {'Summary Review & Toolbar (Sticky)'}
                </div>
                <div className="col-span-7 bg-cyan-300">
                  Detail Review
                </div>
              </div>
            </div>

            <div className="w-full p-4 bg-purple-300 mb-4">
              Iklan?
            </div>

            <div className="w-full bg-zinc-300">
              Diskusi
            </div>
          </div>
          <div className="col-span-3 bg-green-300">
            Purchase Summary (Sticky)
          </div>
        </div>

        <div className="w-full bg-stone-400">
          Rekomendasi?
        </div>
      </div>
    </MainLayout>
  )
}

{/* <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: String(item.description) }} /> */}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // let pageProps: SPageProps|undefined|null;
  // const queryPageProps = `*[_type == "pageProps" && path == $path][0]{_id,name,path,title,metas[]}`;
  // await sanityClient.fetch(queryPageProps, { path: "/news/{slug}" })
  //   .then((response: SPageProps) => pageProps = response)
  //   .catch(error => { pageProps = null })

  // let news: SPost|undefined;
  // const query = `*[_type == "post" && slug.current == $slug][0]{_id,title,mainImage,slug,body,description,publishedAt,categories[]->{title},author->{name,image},}`;
  // await sanityClient.fetch(query, { slug: String(params?.slug) })
  //   .then((response: SPost) => news = response)
  const item = getProductBySlug(String(params?.slug))

  return {
    props: {
      // pageProps,
      item,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // let news: SPost[] = [];
  // const query = `*[_type == "post"]{slug}`;
  // await sanityClient.fetch(query)
  //   .then((response: SPost[]) => news = response)

  // Get the paths we want to pre-render based on posts
  const paths = mockProducts.map((data) => ({
    params: { slug: data.slug.toString() },
  }))

  return { paths, fallback: 'blocking' }
}

export default ShopDetailPage;