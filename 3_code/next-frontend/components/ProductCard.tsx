import Link from "next/link";
import { useState, useEffect } from "react";

import { IProduct } from "../interfaces/dataInterface"
import { calcPercent } from "../utils/mathHelper";
import MyNumberFormat from "../utils/numberFormater";

interface IProps {
  item: IProduct
}

export function ProductCard(props: IProps) {
  const { item } = props;
  const [finalPrice, setFinalPrice] = useState<number>(item.price);
  // const [imgActiveIndex, setImgActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (item.feature && item.feature.type == "discount") {
      if (String(item.feature.value).includes("%"))
        setFinalPrice(item.price - calcPercent(item.price, Number(String(item.feature.value).replace("%", ""))))
      else setFinalPrice(item.price - Number(item.feature.value))
    }
  }, [item])

  return (
    <div className="h-72 w-full rounded shadow border bg-white">
      <Link href={`/shop/${item.slug}`}>
        <a>
          <div className="h-40 relative group" >
            <img src={item.images[1].src} loading="lazy" alt="..." className="absolute h-full w-full" />
            <img src={item.images[0].src} loading="lazy" alt="..." className="absolute h-full w-full group-hover:animate-fade-out" />
          </div>

          <div className="flex flex-col h-32 p-2">
            <h6 title={item.title} className="text-sm line-clamp-2 mb-1">{item.title}</h6>

            <p className="text-sm font-semibold mb-0.5">
              <MyNumberFormat value={finalPrice} />
            </p>

            <div className="mb-0.5 grow">
              { item.feature?.type == "discount" ? (
                <div className="flex flex-row gap-1 align-center">
                  <span className="text-xs bg-red-200 text-red-600 px-1 py-0.5 rounded">{item.feature.value}</span>
                  <span className="text-xs text-zinc-400 line-through">
                    <MyNumberFormat value={item.price} />
                  </span>
                </div>
              ) : item.feature?.type == "cashback" ? (
                <div className="text-xs inline bg-primary-200 text-primary-600 px-1 py-0.5 rounded">Cashback</div>
              ) : (<div/>) }
            </div>

            <div className="flex flex-row items-center gap-1.5 text-zinc-500">
              <div className="flex flex-row gap-1 items-center group">
                <i className="bi bi-star-fill group-hover:text-yellow-400"></i>
                <p className="text-sm">{item.rating?.value ?? 0}</p>
              </div>
              <div className="h-4 w-[1.2px] bg-zinc-400" />
              <div className="flex flex-row gap-1 items-center group truncate">
                <i className="bi bi-bag-heart-fill group-hover:text-primary-400"></i>
                <p title={String(item.sold) ?? "0"} className="text-sm">{item.sold ?? 0}</p>
              </div>
              <div className="h-4 w-[1.2px] bg-zinc-400" />
              <div className="flex flex-row gap-1 items-center group truncate">
                <i className="bi bi-eye-fill group-hover:text-orange-500"></i>
                <p title={String(item.views) ?? "0"} className="text-sm">{item.views ?? 0}</p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export function ProductCard2(props: IProps) {
  const { item } = props;
  const [finalPrice, setFinalPrice] = useState<number>(item.price);
  const [wishlisted, setWishlisted] = useState<boolean>(false);
  // const [imgActiveIndex, setImgActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (item.feature && item.feature.type == "discount") {
      if (String(item.feature.value).includes("%"))
        setFinalPrice(item.price - calcPercent(item.price, Number(String(item.feature.value).replace("%", ""))))
      else setFinalPrice(item.price - Number(item.feature.value))
    }
  }, [item])

  return (
    <div className="h-80 w-full rounded shadow">
      <div className="w-full h-72 rounded-t rounded-b-none border bg-white">
        <Link href={`/shop/${item.slug}`}>
          <a>
            <div className="h-40 relative group" >
              <img src={item.images[1].src} loading="lazy" alt="..." className="absolute h-full w-full" />
              <img src={item.images[0].src} loading="lazy" alt="..." className="absolute h-full w-full group-hover:animate-fade-out" />
            </div>

            <div className="flex flex-col h-32 p-2">
              <h6 title={item.title} className="text-sm line-clamp-2 mb-1">{item.title}</h6>

              <p className="text-sm font-semibold mb-0.5">
                <MyNumberFormat value={finalPrice} />
              </p>

              <div className="mb-0.5 grow">
                { item.feature?.type == "discount" ? (
                  <div className="flex flex-row gap-1 align-center">
                    <span className="text-xs bg-red-200 text-red-600 px-1 py-0.5 rounded">{item.feature.value}</span>
                    <span className="text-xs text-zinc-400 line-through">
                      <MyNumberFormat value={item.price} />
                    </span>
                  </div>
                ) : item.feature?.type == "cashback" ? (
                  <div className="text-xs inline bg-primary-200 text-primary-600 px-1 py-0.5 rounded">Cashback</div>
                ) : (<div/>) }
              </div>

              <div className="flex flex-row items-center gap-1.5 text-zinc-500">
                <div className="flex flex-row gap-1 items-center group">
                  <i className="bi bi-star-fill group-hover:text-yellow-400"></i>
                  <p className="text-sm">{item.rating?.value ?? 0}</p>
                </div>
                <div className="h-4 w-[1.2px] bg-zinc-400" />
                <div className="flex flex-row gap-1 items-center group truncate">
                  <i className="bi bi-bag-heart-fill group-hover:text-primary-400"></i>
                  <p title={String(item.sold) ?? "0"} className="text-sm">{item.sold ?? 0}</p>
                </div>
                <div className="h-4 w-[1.2px] bg-zinc-400" />
                <div className="flex flex-row gap-1 items-center group truncate">
                  <i className="bi bi-eye-fill group-hover:text-orange-500"></i>
                  <p title={String(item.views) ?? "0"} className="text-sm">{item.views ?? 0}</p>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
      <div
        className="h-8 w-full flex flex-row gap-1 justify-center items-center cursor-pointer rounded-b bg-primary-500 group"
        onClick={() => { setWishlisted(!wishlisted); }}
      >
        <i className={`bi bi-heart${wishlisted?"-fill":""} text-white group-hover:animate-beat`}></i>
        <p className="text-sm text-white">Wishlist</p>
      </div>
    </div>
  )
}