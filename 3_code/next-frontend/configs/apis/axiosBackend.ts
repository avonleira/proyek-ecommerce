// Axios Instance for Customization Purposes
import axios from "axios";
// import { EncryptStorage } from "encrypt-storage";

// const encryptStorage = new EncryptStorage(`${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`, {
//   storageType: 'sessionStorage',
// });

export const axiosBackend = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ENDPOINT,
  withCredentials: true,
});