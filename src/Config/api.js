import axios from "axios";
import { logOut } from "../Features/Auth/authSlice";
import Store from "../App/store";
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => response,
  (response) => {
    if (response.code === "ERR_NETWORK") {
      Store.dispatch(logOut("Интернет билан боғлиқ муаммо мавжуд"));
    }
    if (response.response.status === 401) {
      Store.dispatch(logOut("Авторизация устарела"));
      window.location = "/login";
    }
    return Promise.reject(response?.data?.error);
  }
);

export default instance;
