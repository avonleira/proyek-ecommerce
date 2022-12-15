// Axios Instance for Customization Purposes
import axios from "axios";
// import { EncryptStorage } from "encrypt-storage";

// const encryptStorage = new EncryptStorage(`${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`, {
//   storageType: 'sessionStorage',
// });

export const axiosBackend = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
});