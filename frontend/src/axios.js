import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

// const axiosClient = axios.create({
//   baseURL: BASE_URL,
// });

export const axiosPrivateClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// race condition access refresh tokens

// export default axiosClient;
