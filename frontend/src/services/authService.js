import { axiosPrivateClient } from "../axios";

const authService = {
  getUser: async (config) => {
    const response = await axiosPrivateClient.get("/user", config);
    return response.data;
  },

  register: async (userData) => {
    const response = await axiosPrivateClient.post("/signup", userData, {
      withCredentials: true,
    });
    return response.data;
  },

  login: async (userData) => {
    const response = await axiosPrivateClient.post("/login", userData, {
      withCredentials: true,
    });
    return response.data;
  },

  logout: async () => {
    const response = await axiosPrivateClient.post("/logout", "logout", {
      withCredentials: true,
    });
    return response;
  },

  resetPassword: async (userData) => {
    const response = await axiosPrivateClient.post(
      "/forgot-password",
      userData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  },

  resendVerification: async (userData) => {
    const response = await axiosPrivateClient.post("/email/resend", userData);
    return response.data;
  },
};

export default authService;
