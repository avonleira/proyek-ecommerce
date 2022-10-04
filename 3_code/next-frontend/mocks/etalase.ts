import { IEtalase } from "../interfaces/dataInterface";
import { getRandomProduct } from "./products";

export const mockEtalase: IEtalase[] = [
  {
    header: "Belanja yuk!", subheader: "Spesial Untuk Kamu",
    slug: "belanja-yuk-event", priority: 10, card_type: "normal",
    products: getRandomProduct(),
    active_start: new Date(2022, 10, 1, 7).toString(),
    active_end: new Date(2022, 10, 15, 7).toString(),
  },
  {
    header: "Sambut musim hujan!",
    slug: "sambut-musim-hujan-event", priority: 5, card_type: "wishlist",
    products: getRandomProduct(),
    active_start: new Date(2022, 9, 15, 7).toString(),
    active_end: new Date(2022, 11, 15, 7).toString(),
  },
]