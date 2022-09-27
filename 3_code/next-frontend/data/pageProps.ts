export interface PagePropsInterface {
  title: string
  metas?: {
    name: string
    content: string
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