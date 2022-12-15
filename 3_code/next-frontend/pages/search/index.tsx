import { useEffect, ChangeEvent, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { PagePropsInterface } from "../../data/pageProps";
import MainLayout from "../../layouts/main/MainLayout";
import { mockProducts } from "../../mocks/products";
import { ProductCard } from "../../components/ProductCard";
import MyPagination from "../../components/MyPagination";

interface IProps {
  pageProps: PagePropsInterface
  products: typeof mockProducts
}

function SearchProductPage(props: IProps) {
  const { pageProps, products } = props;
  const router = useRouter();
  // const [currPage, setCurrPage] = useState<number>(!!router.query.page?Number(router.query.page):1);
  const currPage = !!router.query.page?Number(router.query.page):1;
  const pageCount = 1;

  const sortOption = [
    { value: "1", label: "Paling Relevan", },
    { value: "2", label: "Ulasan", },
    { value: "3", label: "Terbaru", },
    { value: "4", label: "Harga Tertinggi", },
    { value: "5", label: "Harga Terendah", },
  ]

  const filterFormHook = useForm({
    defaultValues: {
      tsr: router.query.tsr??false,
      pmin: router.query.pmin??0,
      pmax: router.query.pmax??0,
    }
  });
  const filterFormSubmit = async (data: any) => {
    let nextRoute = `/search?q=${router.query.q??""}`;
    if (data.tsr) nextRoute += `&tsr=1`;
    if (!!data.pmin && String(data.pmin).length) nextRoute += `&pmin=${data.pmin}`;
    if (!!data.pmax && String(data.pmax).length) nextRoute += `&pmax=${data.pmax}`;
    if (!!router.query.sort) nextRoute += `&sort=${router.query.sort}`;
    if (!!router.query.page) nextRoute += `&page=${router.query.page}`;
    router.push(nextRoute);
  }

  const handleSortChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    let nextRoute = `/search?q=${router.query.q??""}`;
    if (!!router.query.tsr) nextRoute += `&tsr=${router.query.tsr}`;
    if (!!router.query.pmin) nextRoute += `&pmin=${router.query.pmin}`;
    if (!!router.query.pmax) nextRoute += `&pmax=${router.query.pmax}`;
    if (!!router.query.page) nextRoute += `&page=${router.query.page}`;
    nextRoute += `&sort=${e.target.value}`;
    router.push(nextRoute);
  }

  const handlePaginationChange = (newValue: number) => {
    let nextRoute = `/search?q=${router.query.q??""}`;
    if (!!router.query.tsr) nextRoute += `&tsr=${router.query.tsr}`;
    if (!!router.query.pmin) nextRoute += `&pmin=${router.query.pmin}`;
    if (!!router.query.pmax) nextRoute += `&pmax=${router.query.pmax}`;
    if (!!router.query.sort) nextRoute += `&sort=${router.query.sort}`;
    nextRoute += `&page=${newValue}`;
    router.push(nextRoute);
  }

  useEffect(() => {
    let currPmin = filterFormHook.watch("pmin");
    let currPmax = filterFormHook.watch("pmax");
    if (Number(currPmin)!==0 && Number(currPmax)<=Number(currPmin)) filterFormHook.setValue("pmax", String(Number(currPmax)+10000));
  }, [filterFormHook.watch("pmin"), filterFormHook.watch("pmax")])

  return (
    <MainLayout pageProps={pageProps}>
      <div className="my-container py-6 grid grid-cols-10 gap-4 md:gap-8">
        <div className="col-span-2">
          <p className="text-lg font-semibold mb-2">Filter</p>
          <form className="rounded border shadow" onSubmit={filterFormHook.handleSubmit(filterFormSubmit)}>

            <div className="text-sm p-1 border-b">
              <div className="flex flex-row items-center justify-between">
                <p className="font-semibold">Rating</p>
              </div>
              <div className="p-1">
                <div className="flex flex-row items-center gap-2">
                  <input type="checkbox" id="search-filter-rating-item-1" className="form-checkbox" {...filterFormHook.register("tsr")} />
                  <label htmlFor="search-filter-rating-item-1" className="flex flex-row items-center gap-1">
                    <i className="bi bi-star-fill text-yellow-400 text-lg" />
                    <span className="">3 Keatas</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="text-sm p-1 border-b">
              <div className="flex flex-row items-center justify-between">
                <p className="font-semibold">Harga</p>
              </div>
              <div className="p-1">
                <div className="flex flex-row items-center mb-1">
                  <div className="rounded-l py-1 px-2 border-2 bg-neutral-200 font-semibold text-neutral-500">Rp</div>
                  <input type="number" step={10000} min={0} placeholder="Harga Minimum" {...filterFormHook.register("pmin")} className="rounded-l-none rounded-r w-full p-1 border-2 focus:outline-none" />
                </div>
                <div className="flex flex-row items-center">
                  <div className="rounded-l py-1 px-2 border-2 bg-neutral-200 font-semibold text-neutral-500">Rp</div>
                  <input type="number" step={10000} min={0} placeholder="Harga Maximum" {...filterFormHook.register("pmax")} className="rounded-l-none rounded-r w-full p-1 border-2 focus:outline-none" />
                </div>
              </div>
            </div>

            <div className="text-sm p-1">
              <button type="submit" className="btn btn-sm btn-primary w-full">Terapkan</button>
            </div>

          </form>
        </div>
        <div className="col-span-8">
          <div className="flex flex-row items-center justify-between gap-4 mb-8">
            <p className="text-sm line-clamp-1">
              {`Menampilkan ${1} - ${60} barang dari total ${356} untuk `}
              <span className="font-semibold">{`"${router.query.q}"`}</span>
            </p>
            <div className="flex flex-row items-center gap-1">
              <p className="text-sm font-semibold">Urutkan: </p>
              <div className="w-40">
                <select className="form-select text-sm p-2" defaultValue={router.query.sort??"1"} onChange={handleSortChange}>
                  { sortOption.map((opt, index) => (
                    <option key={`search-sort-option-${index}`} value={opt.value}>{opt.label}</option>
                  )) }
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-10 gap-3 mb-4">
            { products?.map((item, index) => (
              <div key={index} className="col-span-2">
                <ProductCard item={item} />
              </div>
            )) }
          </div>
          
          { pageCount > 1 ? (
            <div className="py-4 flex flex-row justify-end">
              <MyPagination
                count={10} page={currPage}
                onChange={handlePaginationChange}
              />
            </div>
          ) : null }
        </div>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let searchProductPageProps: PagePropsInterface = {
    title: `Cari ${context.query.q} | Duta Tech`,
  }
  
  return {
    props: {
      pageProps: searchProductPageProps,
      products: mockProducts
    },
  }
}

export default SearchProductPage;