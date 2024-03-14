import axios from "axios";
import { getAuthToken } from "./services/authService";

const axiosClient = axios.create({
  baseURL: `http://localhost:8000/api`,
});


 instance.interceptors.request.use((config) => {
   const token = localStorage.getItem("token");
   config.headers.Authorization = `Bearer ${token}`;
   return config;
 });


// race condition access refresh tokens

export default axiosClient;
