
import Link from "next/link";
import { useState, useEffect, Fragment } from 'react';
import { Autoplay, EffectFade, Pagination, Navigation, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard, ProductCard2 } from "../components/ProductCard";
import { categories } from "../data/categories";

import { landingPageProps } from '../data/pageProps';
import { IEtalase } from "../interfaces/dataInterface";
import MainLayout from '../layouts/main/MainLayout'
import { mockEtalase } from "../mocks/etalase";
import { carouselItems } from "../mocks/landingPage";

interface IProps {
  pageProps: typeof landingPageProps
  carousel: typeof carouselItems
  etalase: typeof mockEtalase
}

const HomePage = (props: IProps) => {
  const { pageProps, carousel, etalase } = props;

  return (
    <MainLayout pageProps={pageProps}>
      <section id="landing-carousel" className="my-container py-3">
        <Swiper className="mySwiper primarySwiper rounded"
          loop={true} effect={"fade"}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Lazy, EffectFade, Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
        >
          { carousel?.map((item, index) => (
            <SwiperSlide key={`landing-carousel-item-${index}`}>
              <Link href={item.path}>
                {/* <Image title={item.title} src={item.src} alt={item.alt} loading="lazy" layout="responsive" width="100%" height="16rem" style={{ objectFit: "cover" }} /> */}
                <img title={item.title} src={item.src} alt={item.alt} loading="lazy" className="w-full h-64 object-cover bg-black" />
              </Link>
            </SwiperSlide>
          )) }
        </Swiper>
      </section>

      <section id="landing-categories" className="my-container py-3">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          <div
            className="col-span-1 p-2 rounded border shadow text-white bg-primary-500 group cursor-pointer"
            onClick={() => {}}
          >
            <p className="inline-block text-sm md:text-base group-hover:animate-bounce">{"Semua"}</p>
          </div>
          { categories?.slice(0, 5)?.map((item, index) => (
            <Link key={`landing-categories-item-${index}`} href={`/cat/${item.slug}`}>
              <a
                className="col-span-1 p-2 rounded border shadow group cursor-pointer"
                style={{ backgroundColor: item.color, color: "white" }}
              >
                <p className="inline-block text-sm md:text-base group-hover:animate-bounce">{item.label}</p>
              </a>
            </Link>
          )) }
        </div>
      </section>
      
      <section id="landing-etalase" className="my-container">
        { etalase?.map((etalase, index) => (
          <Fragment key={`landing-etalase-item-${index}`}>
            { index > 0 ? (<hr/>) : null }
            <ProductEtalaseSection etalase={etalase} />
          </Fragment>
        )) }
      </section>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      pageProps: landingPageProps,
      carousel: carouselItems,
      etalase: mockEtalase,
    },
  }
}

interface ProductEtalaseSectionProps {
  etalase: IEtalase
}
function ProductEtalaseSection(props: ProductEtalaseSectionProps) {
  const { etalase } = props;
  const [prodShowNav, setProdShowNav] = useState<boolean>(false);
  // console.log(etalase);

  return (
  <div className="py-4" onMouseLeave={() => setProdShowNav(false)}>
    <div className="flex flex-col md:flex-row md:gap-3 md:items-end mb-1">
      <h1 className="hidden md:block text-xl font-semibold">{etalase.header}</h1>
      <div className="md:hidden flex flex-row justify-between items-end">
        <h1 className="text-xl font-semibold">{etalase.header}</h1>
        <div className="font-semibold flex-1 text-right">
          <Link href={`/discovery/${etalase.slug}`}>
            <a className="text-sm text-primary-500 hover:text-primary-600">{"Lihat Semua"}</a>
          </Link>
        </div>
      </div>
      { etalase.subheader ? (
        <h2 className="text-zinc-400 text-sm">{etalase.subheader}</h2>
      ) : null }
      <div className="hidden md:block font-semibold flex-1 md:text-right">
        <Link href={`/discovery/${etalase.slug}`}>
          <a className="text-sm text-primary-500 hover:text-primary-600">{"Lihat Semua"}</a>
        </Link>
      </div>
    </div>

    <Swiper className="mySwiper primarySwiper rounded"
      // rewind={true}
      // pagination={{ clickable: true }}
      navigation={prodShowNav}
      modules={[Navigation, Pagination, Lazy]}
      breakpoints={{
        "@0.00": { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 8 },
        "@0.75": { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 12 },
        "@1.00": { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 12 },
        "@1.25": { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 12 },
        // "@1.50": { slidesPerView: 6, slidesPerGroup: 6, spaceBetween: 12 },
      }}
    >
      { etalase.products?.map((item) => (
        <SwiperSlide
          key={`landing-featured-product-item-${item.id}`}
          className="py-2"
          onMouseEnter={() => setProdShowNav(true)}
        >
          { etalase.card_type == "normal" ? (
            <ProductCard item={item} />
          ) : etalase.card_type == "wishlist" ? (
            <ProductCard2 item={item} />
          ) : null }
        </SwiperSlide>
      )) }
    </Swiper>
  </div>
  )
}

export default HomePage;