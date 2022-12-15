import { ImageInterface } from "./elementInterface"

export interface IEtalase {
  header: string
  subheader?: string
  slug: string
  products: IProduct[]
  priority: number
  card_type: "normal"|"wishlist"
  active_start?: string | Date // DB only
  active_end?: string | Date // DB only
}

export interface IProduct {
  id: number
  slug: string
  title: string
  description?: string
  images: ImageInterface[]
  // details?: {
    price: number
    discount?: {
      type: "percentage"|"exact"
      value: number
    }
    condition?: "new"|"second"
    weight?: {
      type: "mg"|"g"|"kg"|string
      value: number
    }
    sold?: number
    views?: number
    category_id?: number
    category?: {
      label: string
    }
  // }
  feature?: {
    type: "cashback"|"discount"
    value?: number|string|any
  }
  rating?: {
    value: number
    by?: number
  }
  discussion?: any[]
  reviews?: IReview[]
}

export interface IReview {
  id: number
  id_product: IProduct['id']
  rating: number
  content: string
  created_at: Date
}