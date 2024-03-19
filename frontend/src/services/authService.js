import axiosClient, { axiosPrivateClient } from "../axios";

const authService = {
  register: async (userData) => {
    const response = await axiosPrivateClient.post("/signup", userData);
    return response.data;
  },
  login: async (userData) => {
    const response = await axiosPrivateClient.post("/login", userData);
    return response.data;
  },
  logout: async () => {
    const response = await axiosClient.get("/logout", {
      withCredentials: true,
    });

    return response;
  },
};

export default authService;
