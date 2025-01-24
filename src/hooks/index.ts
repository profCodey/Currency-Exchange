
import { queryClient } from "src/pages/_app";
import { AUTH_TOKENS } from "src/configs/auth";
import axios from "axios";
import Cookies from "js-cookie";
import toast from 'react-hot-toast'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APICLIENT_BASE_URL,
});

const addTokenToRequest = (request: any) => {
  const token = Cookies.get( AUTH_TOKENS.ACCESS_TOKEN);
  request.headers.Authorization = `Bearer ${token}`;
  request.headers['X-Tenant'] = 'admin';

return request;
};

axiosInstance.interceptors.request.use(addTokenToRequest);

axios.interceptors.response.use(
  function (response: any) {
    if (response.status === 401 && window.location.pathname !== "/login") {
      Cookies.remove( AUTH_TOKENS.ACCESS_TOKEN);
      Cookies.remove( AUTH_TOKENS.FIRST_NAME);
      Cookies.remove( AUTH_TOKENS.LAST_NAME);
      Cookies.remove( AUTH_TOKENS.REFRESH_TOKEN);
      window.location.href = "/login";
      queryClient.clear();

      return;
    } else return response;
  },


  function (error) {
    const err = error.response?.data.errors
    for (const value of err){
      toast.error(value.detail);
    }
    if (
    (error.response.status === 401 || error.response.status === 415) &&
      window.location.pathname !== "/login"
    ) {
      Cookies.remove( AUTH_TOKENS.ACCESS_TOKEN);
      Cookies.remove( AUTH_TOKENS.FIRST_NAME);
      Cookies.remove( AUTH_TOKENS.LAST_NAME);
      Cookies.remove( AUTH_TOKENS.REFRESH_TOKEN);
      window.location.href = "/login";
    } else {
      return Promise.reject(error);
    }
  }
);
