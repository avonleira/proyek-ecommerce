export interface PagePropsInterface {
  title: string
  metas?: {
    name: string
    content: string
  }[]
  links?: {
    rel: string
    href: string
  }[]
}

export const loginPageProps: PagePropsInterface = {
  title: "Masuk | Duta Tech",
  metas: [
    { name: "description", content: "Halaman otentikasi situs Duta Tech. Silahkan masuk dan temukan barang yang anda cari." },
    { name: "robots", content: "no-follow" },
  ]
}

export const registerPageProps: PagePropsInterface = {
  title: "Daftar | Duta Tech",
  metas: [
    { name: "description", content: "Halaman otentikasi situs Duta Tech. Silahkan masuk dan temukan barang yang anda cari." },
    { name: "robots", content: "no-follow" },
  ]
}
export const registerPasswordTerms = [
  { id: 1, filled: false, label: "Minimal 6 karakter" },
  { id: 2, filled: false, label: "Mengandung satu angka" },
  { id: 3, filled: false, label: "Mengandung satu huruf besar" },
  { id: 4, filled: false, label: "Mengandung satu huruf kecil" },
]

export const accountSettingsProfilePageProps: PagePropsInterface = {
  title: "Profil Akun | Duta Tech",
}
export const accountSettingsAddressPageProps: PagePropsInterface = {
  title: "Daftar Alamat | Duta Tech",
}
export const accountSettingsPaymentPageProps: PagePropsInterface = {
  title: "Pembayaran | Duta Tech",
}
export const accountOrderListPageProps: PagePropsInterface = {
  title: "Daftar Transaksi Pembelian | Duta Tech",
}
export const accountPaymentListPageProps: PagePropsInterface = {
  title: "Menunggu Pembayaran | Duta Tech",
}
export const accountWishlistPageProps: PagePropsInterface = {
  title: "Wishlist | Duta Tech",
}
export const accountInboxDiscussionPageProps: PagePropsInterface = {
  title: "Ulasan | Duta Tech",
}
export const accountInboxReviewsPageProps: PagePropsInterface = {
  title: "Wishlist | Duta Tech",
}

export const landingPageProps: PagePropsInterface = {
  title: "Welcome | Duta Tech",
  metas: [
    { name: "description", content: "Selamat datang di Duta Tech, solusi dari kebutuhan anda." },
    { name: "keyword", content: "technology,ecommerce,shop,electronics,software" },
  ]
}

export const aboutPageProps: PagePropsInterface = {
  title: "Tentang Kami | Duta Tech",
  metas: [
    { name: "description", content: "Selamat datang di Duta Tech, solusi dari kebutuhan anda." },
    { name: "keyword", content: "technology,ecommerce,shop,electronics,software" },
  ]
}

export const privacyPolicyPageProps: PagePropsInterface = {
  title: "Kebijakan dan Privasi | Duta Tech",
  metas: [
    { name: "description", content: "Selamat datang di Duta Tech, solusi dari kebutuhan anda." },
    { name: "keyword", content: "technology,ecommerce,shop,electronics,software" },
  ]
}

export const termsConditionsPageProps: PagePropsInterface = {
  title: "Syarat dan Ketentuan | Duta Tech",
  metas: [
    { name: "description", content: "Selamat datang di Duta Tech, solusi dari kebutuhan anda." },
    { name: "keyword", content: "technology,ecommerce,shop,electronics,software" },
  ]
}

export const cartPageProps: PagePropsInterface = {
  title: "Keranjang | Duta Tech",
}

export const cartCheckoutPageProps: PagePropsInterface = {
  title: "Checkout | Duta Tech",
}