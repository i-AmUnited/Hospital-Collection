import Axios from "axios";
import { alternate_base_url, APP_SECRET_KEY, base_url } from "../constants";
import CryptoJS from "crypto-js";

export const apiClient = Axios.create(
    {
        baseURL: base_url,
        headers: { "Content-Type": "application/json" },
    }
)

export const apiClientWithToken = Axios.create(
    {
        baseURL: base_url,
        headers: { "Content-Type": "application/json" },
    }
)

export const alternateapiClient = Axios.create(
  {
      baseURL: alternate_base_url,
      headers: { "Content-Type": "application/json" },
  }
)

apiClientWithToken.interceptors.request.use(
    (config) => {
        const decryptedData = CryptoJS.AES.decrypt(localStorage.getItem("token"), APP_SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const parsedData = JSON.parse(decryptedData); 
        if (parsedData) {
          config.headers["Authorization"] = `Bearer ${parsedData}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
)
