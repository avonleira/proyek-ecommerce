export interface IMock404 {
  header: string
  img_url: string
  img_svg: string | any
  subheader: string
}

export interface IMockAbout {
  url_img: string
  header?: string
  description?: string
}

export interface IMockAboutTeam {
  name: string
  position: string
  url_img: string
}

export interface IMockBanner {
  order?: number
  title?: string
  subtitle?: string
  alt?: string
  path: string
}

export interface IMockFaq {
  pertanyaan: string| JSX.Element
  jawaban: string | JSX.Element
}

export interface IMockProduct {
  id: number
  slug: string
  nama_product: string
  stock: number
  thumbnail: string
  harga: number
  description: string
  keyword?: string
  view_count?: number
  buy_count?: number
}

export interface IMockReview {
  dtrans_id: number
  user_id: number
  user?: any | IMockUser
  product_id: number
  rating: number | string
  review?: string
}

export interface IMockUser {
  id: number
  name: string
  email?: string
  age?: number
  created_at: Date | string
  updated_at?: Date | string
}

export interface IMockPapanMading {
  id: number
  title: string
  subtitle: string
  src: string
  alt: string
}