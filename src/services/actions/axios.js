import {getCookie, refreshTokenAxios} from '../actions/auth'

const axios = require("axios");


export const instance = axios.create({
  baseURL: "https://norma.nomoreparties.space/api/",
  headers: {
    "Content-Type": "application/json",
  },
  
});

instance.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");
    if (token) {
      config.headers.Authorization = "Bearer " + token;

    } else {
      delete instance.defaults.headers.common.Authorization;

    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
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