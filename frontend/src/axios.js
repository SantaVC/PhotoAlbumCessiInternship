import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivateClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem(TOKEN_KEY);

//   config.headers.Authorization = `Bearer ${token}`;

//   return config;
// });

// race condition access refresh tokens

export default axiosClient;
