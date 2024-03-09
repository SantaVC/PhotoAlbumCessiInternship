import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.ViTE_API_BASE_URL}/api`
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return error;
    }
    return Promise.reject(error);
  }
);

export default instance;
