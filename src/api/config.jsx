import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    config.baseURL = process.env.REACT_APP_API_ENDPOINT;
    config.headers = Object.assign(
      {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
      config.headers
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    let token = localStorage.getItem("token");
    config.baseURL = process.env.REACT_APP_API_ENDPOINT;
    config.headers = Object.assign(
      {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      config.headers
    );
    return config;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("authenticated");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
