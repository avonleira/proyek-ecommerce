import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import SwiperClass from "swiper/types/swiper-class";

import { IProduct } from "../../interfaces/dataInterface";
import MainLayout from "../../layouts/main/MainLayout";
import { getProductBySlug, mockProducts } from "../../mocks/products";
import { range2 } from "../../utils/mathHelper";
import MyNumberFormat from "../../utils/numberFormater";
import MyTabPanel from "../../components/MyTabPanel";

const MyRichTypography = dynamic(() => import("../../components/MyRichTypography"), { ssr: false })

interface IProps {
  item: IProduct
}

function ShopDetailPage(props: IProps) {
  const { item } = props;
  console.log(item)
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();
  const [firstSwiper, setFirstSwiper] = useState<SwiperClass>();
  const [activeMenu, setActiveMenu] = useState<number>(0);

  const detailMenu = [
    { label: "Detail", component: <DetailPanel item={item} /> },
    { label: "Info Penting", component: <InfoPanel item={item} /> },
  ]
  return (
    <MainLayout>
      <div className="my-container py-2">
        <div className="bg-blue-300 mb-4 py-1">
          Breadcrumb
        </div>

        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-9">
            <div className="grid grid-cols-10 gap-4 mb-4">
              <div className="col-span-4">
                <div className="sticky top-32 max-w-full overflow-y-auto">
                  <div className="">
                    <Swiper
                      className="unselectable mb-2" spaceBetween={10} // navigation={true}
                      thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                      modules={[FreeMode, Thumbs]}
                    >
                      { item.images?.map((image, index) => (
                        <SwiperSlide key={`shop-slug-images-item-${index}`}>
                          <img
                            src={image.src} title={image.title} alt={image.alt} loading={image.loading}
                          />
                          {/* <img
                            src={`https://swiperjs.com/demos/images/nature-${item}.jpg`}
                            alt={`Gambar ${item}`} title={`Gambar ${item}`}
                            className="rounded-md"
                          /> */}
                        </SwiperSlide>
                      )) }
                    </Swiper>
                  </div>
                  <div className="mb-1 pb-1">
                    <Swiper
                      className="whiteSwiper unselectable"
                      onSwiper={setThumbsSwiper} controller={{ control: firstSwiper }}
                      spaceBetween={10} slidesPerView={4}
                      navigation={true} watchSlidesProgress={true} // freeMode={true}
                      modules={[Navigation, Thumbs]}
                    >
                      { item.images?.map((image, index) => (
                        <SwiperSlide key={`shop-slug-images-thumbnails-item-${index}`}>
                          <img
                            src={image.src} title={image.title} alt={image.alt} loading={image.loading}
                          />
                          {/* <img
                            src={`https://swiperjs.com/demos/images/nature-${item}.jpg`}
                            alt={`Gambar ${item}`} title={`Gambar ${item}`}
                            className="rounded-md"
                          /> */}
                        </SwiperSlide>
                      )) }
                    </Swiper>
                  </div>
                </div>
              </div>
              <div className="col-span-6">
                <h1 className="text-lg font-semibold">{item.title}</h1>

                <div className="flex flex-row gap-2 text-sm text-stone-500 mb-2">
                  <p className="text-black">{"Terjual"}</p>
                  <p className="">{item.sold}</p>
                  <p>{"•"}</p>
                  <i className="bi bi-star-fill text-yellow-400"></i>
                  <p className="text-black">{item.rating?.value}</p>
                  <p className="">{`(${item.rating?.by} rating)`}</p>
                  <p>{"•"}</p>
                  <p className="text-black">{"Diskusi"}</p>
                  <p className="">{`(${item.discussion?.length})`}</p>
                </div>

                <p className="text-3xl font-semibold mb-6">
                  <MyNumberFormat value={item.price} />
                </p>

                <div className="flex flex-row border-y border-gray-500">
                  { detailMenu.map((menu, index) => (
                    <div
                      key={`shop-slug-detail-menu-item-${index}`}
                      className={`text-center py-2 px-4 cursor-pointer text-semibold unselectable border-b-2 ${activeMenu===index?"text-primary-500 border-primary-500":"text-stone-500 hover:text-black border-white"}`}
                      onClick={() => setActiveMenu(index)}
                    >
                      {menu.label}
                    </div>
                  )) }
                </div>
                
                <div className="py-2">
                  { detailMenu.map((menu, index) => (
                    <MyTabPanel key={`shop-slug-detail-menu-panel-${index}`} index={index} active={activeMenu}>
                      {menu.component}
                    </MyTabPanel>
                  )) }
                </div>

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
          <div className="col-span-3 h-full relative">
            <div className="border border-gray-300 shadow rounded-md p-2 sticky top-32 max-w-full overflow-y-auto">
              Purchase Summary (Sticky)
            </div>
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

interface IDetailPanelProps {
  item?: IProduct
}
function DetailPanel(props: IDetailPanelProps) {
  const { item } = props;
  const [openDesc, setOpenDesc] = useState<boolean>(false);

  useEffect(() => {
    
  }, [])
  
  if (!item) return null;
  return (
    <div className="">
      <p className="text-sm text-stone-500">
        <span className="">{"Kondisi:"}</span>{" "}
        <span className="text-black">{item.condition==="new"?"Baru":"Bekas"}</span>
      </p>
      <p className="text-sm text-stone-500">
        <span className="">{"Berat Satuan:"}</span>{" "}
        <span className="text-black">{`${item.weight?.value} ${item.weight?.type}`}</span>
      </p>
      <p className="text-sm text-stone-500 mb-2">
        <span className="">{"Kategori:"}</span>{" "}
        <span className="text-primary-500 font-semibold cursor-pointer">{item.category?.label}</span>
      </p>

      <MyRichTypography className={`prose-sm ${openDesc?"":"line-clamp-6"}`} value={String(item.description)} />

      <p
        className="text-sm text-primary-500 font-semibold cursor-pointer"
        onClick={() => setOpenDesc((prevVal) => !prevVal)}
      >
        {"Lihat Selengkapnya"}
      </p>
    </div>
  )
}

interface IInfoPanelProps {
  item: IProduct
}
function InfoPanel(props: IInfoPanelProps) {
  const { item } = props;

  return (
    <div className="">
      Info Panel
    </div>
  )
}

export default ShopDetailPage;