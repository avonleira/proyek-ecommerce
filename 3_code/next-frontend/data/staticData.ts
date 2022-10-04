import { EncryptStorage } from "encrypt-storage";

export const companyProfile = {
  contacts: {
    displayName: 'Duta Tech Indonesia',
    phone: '+62 8123 4622 350',
    whatsApp: '+62 8123 4622 350',
    email: 'arielnovachristian01@gmail.com',
    address: {
      short: 'Gedung DT 21, Jalan Esok Akan Cerah, Jakarta, Indonesia',
      long: 'Gedung DT 21, Jalan Esok Akan Cerah No. 35, Rw7, Kec. Taman, Jakarta Selatan 61257',
      // long: 'Gedung Buncit 36, Jalan Warung Jati Barat No. 36, Ragunan, Jakarta Selatan, 12550',
      embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.7891101768932!2d112.64469765043054!3d-7.377517094650448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e2eb8170290f%3A0xbeceb047ad1a7265!2sJl.%20Citra%20Harmoni%20Blk.%20C1%20No.35%2C%20Rw7%2C%20Sidodadi%2C%20Kec.%20Taman%2C%20Kabupaten%20Sidoarjo%2C%20Jawa%20Timur%2061257!5e0!3m2!1sen!2sid!4v1637826072433!5m2!1sen!2sid",
    },
    copyright: "company.co.id &copy; 2021. All rights reserved.",
  },
  socialLinks: []
}

export const headerTopSubNavItems = [
  { label: "Tentang Kami", path: "/about-us" },
  { label: "Promo", path: "/promo" },
  { label: "Hubungi Kami", path: "/contact-us" },
]

export const headerBestSubCatItems = [
  { label: "Mouse", link: "/" },
  { label: "Keyboard", link: "/" },
  { label: "PC Gaming", link: "/" },
]

export const footerUniversalLinks = [
  { label: "Tentang Duta Tect", path: "/about-us" },
  { label: "Kebijakan & Privasi", path: "/privacy-policy" },
  { label: "Syarat & Ketentuan", path: "/terms-conditions" },
]

// export const encryptStorage = new EncryptStorage(`${process.env.LOCAL_STORAGE_SECRET_KEY}`, {
//   storageType: 'sessionStorage',
// });
// console.log("one", process.env.LOCAL_STORAGE_SECRET_KEY)