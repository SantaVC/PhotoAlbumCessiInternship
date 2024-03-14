import axiosClient from "../axios";
import { TOKEN_KEY, USER_DATA_KEY } from "../constants";

const authService = {
  register: async (userData) => {
    const response = await axiosClient.post("/signup", userData);
    return response.data;
  },
  login: async (userData) => {
    const response = await axiosClient.post("/login", userData);
    return response.data;
  },
  logout: async () => {
    const response = await axiosClient.post("/logout");
    return response;
  },
};

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const setLocalUser = (user) => {
  const parsedUser = JSON.stringify(user);

  localStorage.setItem(USER_DATA_KEY, parsedUser);
};

export const getLocalUser = () => {
  return localStorage.getItem(USER_DATA_KEY);
};

export const removeLocalUser = () => {
  localStorage.removeItem(USER_DATA_KEY);
};

export default authService;
