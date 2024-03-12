import axios from "axios";
import { getAuthToken } from "./services/authService";

const axiosClient = axios.create({
  baseURL: `http://localhost:8000/api`,
});

axiosClient.interceptors.request.use((config) => {
  const token = getAuthToken();

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default axiosClient;
