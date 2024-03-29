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
  resetPassword: async (userData) => {
    const response = await axiosClient.post("/forgot-password", userData);
    return response.data;
  },
  resendVerification: async (userData) => {
    const response = await axiosClient.post("/email/resend", userData);
    return response.data;
  },
};

export default authService;
