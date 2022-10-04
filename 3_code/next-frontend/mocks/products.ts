import { IProduct } from "../interfaces/dataInterface"
import { range } from "../utils/mathHelper"
import { getReviewsByProductId } from "./reviews"

export function getProductBySlug(slug: string): IProduct|undefined {
  return mockProducts.find(product => product.slug == slug);
}

export function getRandomProduct(count: number = 5): IProduct[] {
  let result = [] as IProduct[];

  for (let i = 0; i < count; i++) {
    if (result.length >= mockProducts.length) break;
    let tempProd = mockProducts[Math.floor(Math.random()*mockProducts.length)]
    let kembar = result.find(item => item.slug == tempProd.slug);
    if (!kembar) result.push(tempProd);
  }

  return result;
}

export const mockProducts: IProduct[] = [
  // {
  //   id: 1, slug: "product-example-1",
  //   title: "Product example 1",
  //   description: "Product Example 1 Desc.",
  //   images: [
  //     { title: "", src: "" }
  //   ],
  //   price: 349999, feature: { type: "discount", value: "13%" },
  //   reviews: getReviewsByProductId(1),
  //   sold: 2, views: 10,
  //   // category: { label: "" }
  // },
  {
    id: 2, slug: "digital-alliance-d4-mousepad-gaming-m",
    title: "Digital Alliance D4 MOUSEPAD GAMING M",
    description: "<p>Keluaran terbaru mousepad D4 Mousepad Gaming dari digital alliance dengan ukuran M yang akan membuat anda bisa bermain game dengan nyaman bisa baut dirumahan,warnet,atupun perkantoran dengan spesifikasi mousepad adadibawah ini,</p><p>Model D4 Mousepad Gaming M</p><p><br></p><p>Note : Untuk Produk ini pada saat orderan sudah masuk tidak bisa di batalkan akan kita proses pengiriman cek kembali bahwa alamat sudah sesuai terimakasih</p><p><br></p><p>SPECIFICATION</p><p>Model D4 Mousepad Gaming M</p><p>Type Soft Speed</p><p>Color Black</p><p>Material Polyester</p><p>Natural Rubber Base Design Yes</p><p>Dimension (L x W x H) 400 x 300 x 3 mm</p><p>Other Features Flexible Surface</p><p>Compact Size</p><p>Soft Compound</p><p>Quick Precision</p><p>Anti-Slip Base</p>",
    images: [
      { src: "https://firebasestorage.googleapis.com/v0/b/duta-tech.appspot.com/o/images%2Fproducts%2Fdigital-alliance-d4-mousepad-gaming-m%2Fmousepad-1.jpg?alt=media&token=362269ca-54b0-4f9e-8b9c-1f591022990b" },
      { src: "https://firebasestorage.googleapis.com/v0/b/duta-tech.appspot.com/o/images%2Fproducts%2Fdigital-alliance-d4-mousepad-gaming-m%2Fmousepad-2.jpg?alt=media&token=db1f4190-918f-419c-a586-e0a9372a3778" },
      { src: "https://firebasestorage.googleapis.com/v0/b/duta-tech.appspot.com/o/images%2Fproducts%2Fdigital-alliance-d4-mousepad-gaming-m%2Fmousepad-3.jpg?alt=media&token=da085f23-b0d5-46a9-afb3-036ae91ae87a" },
      { src: "https://firebasestorage.googleapis.com/v0/b/duta-tech.appspot.com/o/images%2Fproducts%2Fdigital-alliance-d4-mousepad-gaming-m%2Fmousepad-4.jpg?alt=media&token=971b63f3-b55d-49fb-bfa4-a6b79da956c8" },
    ],
    price: 79000, condition: "new",
    weight: { type: "g", value: 500 },
    category: { label: "Mouse Pad Gaming" },
    sold: 4125, views: 5120,
    feature: { type: "discount", value: "30%" },
    rating: { value: 4.9, by: 2257 },
    discussion: range({max: 241}),
    reviews: getReviewsByProductId(2),
  },
  {
    id: 3, slug: "mousepad-fantech-ato-mp905-japanese-deskmat-waterproof-xl-900x400x4mm-aqua",
    title: "Mousepad Fantech ATO MP905 Japanese Deskmat Waterproof XL 900x400x4mm - AQUA",
    description: '<p>ESES Komputer</p><p>-------------------------------------------</p><p><strong>* MEMBELI BERARTI SETUJU DENGAN CATATAN TOKO</strong></p><p><strong>* FREE PACKING BUBBLEWRAP 2 LAPIS</strong></p><p>Jika dirasa kurang aman, packingan bisa ditambah</p><p>Packing kayu :&nbsp;<a href="https://www.tokopedia.com/eseskomputer/packing-kayu-khusus-jne" target="_blank" style="color: rgb(230, 145, 56);">https://www.tokopedia.com/eseskomputer/packing-kayu-khusus-jne</a></p><p>Extra bubble : <a href="https://tokopedia.com/eseskomputer/ekstra-bubblewrap-3-lapis" target="_blank" style="color: rgb(230, 145, 56);">https://tokopedia.com/eseskomputer/ekstra-bubblewrap-3-lapis</a></p><p>Lapis kardus : <a href="https://tokopedia.com/eseskomputer/tambahan-packing-lapis-kardus" target="_blank" style="color: rgb(230, 145, 56);">https://tokopedia.com/eseskomputer/tambahan-packing-lapis-kardus</a></p><p><br></p><p>Produk yang kami jual :</p><p>- 100% Baru</p><p>- 100% Original</p><p>- 100% Garansi resmi</p><p>-------------------------------------------</p><p><br></p><p><strong>Spesifikasi : </strong></p><p>MINIMALIST JAPANESE &amp; DESIGN WITH MOISTURE RESISTANCE</p><p>Inspired by Japanese art, with minimalist aspects, to create the perfect desk setup. Coated with a moisture resistant material to ensure your desk always looks great.</p><p><br></p><p>DURABLE &amp; ARTSY</p><p>ATO MP905 features premium durable edge stitching, which allows for use in harsh conditions and for the pad’s design to spread to the exact edge.</p><p><br></p><p>Type : Speed &amp; Control Edition</p><p>Material : Moisture Resistant Silk-Like Surface + Anti-slip Rubber Base</p><p>Stitched-edges : Yes</p><p>Illumination : No</p><p>Dimension : 900*400*4mm</p><p>Thickness: 4mm</p><p><br></p><p>Box Content :</p><p>-ATO MP905 Deskmat</p><p><br></p><p><strong>100% Original Product By Fantech</strong></p><p><br></p><p><strong>Website Resmi : https://fantechworld.com/best-gaming-mouse-pad-gaming-mouse-mat/ato/</strong></p>',
    images: [
      { src: "https://firebasestorage.googleapis.com/v0/b/duta-tech.appspot.com/o/images%2Fproducts%2Fmousepad-fantech-ato-mp905-japanese-deskmat-waterproof-xl-900x400x4mm-aqua%2Fmousepad-fantech-1.jpg?alt=media&token=0d08ec3e-a5ae-421b-bb45-0cb22be768d4" },
      { src: "https://firebasestorage.googleapis.com/v0/b/duta-tech.appspot.com/o/images%2Fproducts%2Fmousepad-fantech-ato-mp905-japanese-deskmat-waterproof-xl-900x400x4mm-aqua%2Fmousepad-fantech-2.jpg?alt=media&token=d624d161-9433-4ee5-812f-9a8b0838db33" },
      { src: "https://firebasestorage.googleapis.com/v0/b/duta-tech.appspot.com/o/images%2Fproducts%2Fmousepad-fantech-ato-mp905-japanese-deskmat-waterproof-xl-900x400x4mm-aqua%2Fmousepad-fantech-3.jpg?alt=media&token=44fb29aa-7da8-44d1-a6d3-aa7fea8ece51" },
      { src: "https://firebasestorage.googleapis.com/v0/b/duta-tech.appspot.com/o/images%2Fproducts%2Fmousepad-fantech-ato-mp905-japanese-deskmat-waterproof-xl-900x400x4mm-aqua%2Fmousepad-fantech-4.jpg?alt=media&token=681888f4-5fad-48d5-b859-71cbd1a3cbf4" },
      { src: "https://firebasestorage.googleapis.com/v0/b/duta-tech.appspot.com/o/images%2Fproducts%2Fmousepad-fantech-ato-mp905-japanese-deskmat-waterproof-xl-900x400x4mm-aqua%2Fmousepad-fantech-5.jpg?alt=media&token=e520dfac-d33e-4b59-80e1-9b6426328a9c" },
      { src: "https://firebasestorage.googleapis.com/v0/b/duta-tech.appspot.com/o/images%2Fproducts%2Fmousepad-fantech-ato-mp905-japanese-deskmat-waterproof-xl-900x400x4mm-aqua%2Fmousepad-fantech-6.jpg?alt=media&token=e2131c0f-9d16-46f3-b665-9e5eb85e21c0" },
      { src: "https://firebasestorage.googleapis.com/v0/b/duta-tech.appspot.com/o/images%2Fproducts%2Fmousepad-fantech-ato-mp905-japanese-deskmat-waterproof-xl-900x400x4mm-aqua%2Fmousepad-fantech-7.jpg?alt=media&token=2ca5b825-ba12-41da-bde7-21b7d99c584a" },
      { src: "https://firebasestorage.googleapis.com/v0/b/duta-tech.appspot.com/o/images%2Fproducts%2Fmousepad-fantech-ato-mp905-japanese-deskmat-waterproof-xl-900x400x4mm-aqua%2Fmousepad-fantech-8.jpg?alt=media&token=04010c7e-283a-4ea1-8597-78eb193e9c2c" },
    ],
    price: 219000, condition: "new",
    weight: { type: "g", value: 750 },
    category: { label: "Mouse Pad Gaming" },
    sold: 17, views: 38,
    rating: { value: 4.9, by: 9 },
    discussion: range({max: 0}),
    reviews: getReviewsByProductId(3),
  },
]