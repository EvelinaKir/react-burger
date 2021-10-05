import {getCookie, refreshTokenAxios} from './auth'

const axios = require("axios");
 interface IConfig {
   headers: {
    Authorization: string
   }
 }

export const instance = axios.create({
  baseURL: "https://norma.nomoreparties.space/api/",
  headers: {
    "Content-Type": "application/json",
  },
  
});

instance.interceptors.request.use(
  (config: IConfig) => {
    const token = getCookie("accessToken");
    if (token) {
      config.headers.Authorization = "Bearer " + token;

    } else {
      delete instance.defaults.headers.common.Authorization;

    }
    return config;
  },
  (error: object) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response: object) => response,
  async (error: {config: object, response: {data: {message: string}}}) => {
    const origReqest = error.config;
    if (error.response.data.message === "jwt expired") {
      const result = await refreshTokenAxios();
      instance.defaults.headers.common["Authorization"] =
        "Bearer" + getCookie("accessToken");
      return instance(origReqest);
    }
    Promise.reject(error);
  }
);