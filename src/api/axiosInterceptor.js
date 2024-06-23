import axios from "axios";
import Cookies from "js-cookie";
import { createBrowserHistory } from "history";
import { baseApiUrl } from "../constants/baseApiUrl";

const history = createBrowserHistory();

const api = axios.create({
  baseURL: baseApiUrl,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log("interceptor request error");
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.response.data.code === "AT1" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");
        const response = await api.post("/api/v1/auth/tokens", {
          refreshToken: refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        Cookies.set("accessToken", accessToken, {
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("refreshToken", newRefreshToken, {
          secure: true,
          sameSite: "Strict",
        });

        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (error) {
        if (error.response.data.code === "RT1") {
          history.push("/login");
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
