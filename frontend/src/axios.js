import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost:8000/api`,
});

// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   config.headers.Authorization = `Bearer ${token}`;

//   return config;
// });

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem("token");

//       window.location.href = "/login";

//       return error;
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
