import { IReview } from "../interfaces/dataInterface";

export const mockReviews: IReview[] = [
  {
    id: 1, id_product: 1,
    rating: 5, content: "Barangnya aman, pengirimannya cepet bget, sellernya ramah",
    created_at: new Date("10/04/2022")
  },
  {
    id: 2, id_product: 1,
    rating: 5, content: "dapet bonus pouch makasih",
    created_at: new Date("08/04/2022")
  },
]

export function getReviewsByProductId(product_id: number): IReview[] {
  return mockReviews.filter(review => review.id_product == product_id);
}

export function getReviewById(id: number): IReview|undefined {
  return mockReviews.find(review => review.id == id);
}