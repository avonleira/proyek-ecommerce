import CryptoJs from "crypto-js"

const cipher: string = process.env.NEXT_PUBLIC_ENCRYPT_SECRET ?? ""

export function encrypt(data: string){
  try {
    return CryptoJs.AES.encrypt(JSON.stringify(data), cipher).toString()
  }
  catch(e) {
    return data;
  }
}

export function decrypt(data:string){
  try {
    let decrypted = CryptoJs.AES.decrypt(data, cipher)
    return JSON.parse(decrypted.toString(CryptoJs.enc.Utf8))
  }
  catch (e) {
    return data;
  }
}

// CARA ENCRYPT DAN DECRYPT
  // init secret key
  // const cipher: string = process.env.REACT_APP_ENCRYPT_SECRET ?? ""
  // encode data
  // let encrypted = CryptoJs.AES.encrypt(JSON.stringify(users.phone), cipher).toString()
  // console.log("encrypt")
  // console.log(encrypted)
  // decode data
  // let decrypted = CryptoJs.AES.decrypt(encrypted, cipher)
  // let decryptedData = JSON.parse(decrypted.toString(CryptoJs.enc.Utf8))
  // console.log("decrypt")
  // console.log(decryptedData)