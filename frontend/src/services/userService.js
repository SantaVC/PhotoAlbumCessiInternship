import { axiosPrivateClient } from "../axios";

const userService = {
  changeNickname: async (data) => {
    const response = await axiosPrivateClient.patch(
      "/profile/change-nickname",
      data
    );
    return response.data;
  },

  resetPassword: async (data) => {
    const response = await axiosPrivateClient.post(
      "/profile/reset-password",
      data
    );
    return response.data;
  },

  changePassword: async (data) => {
    const response = await axiosPrivateClient.patch(
      "/profile/change-password",
      data
    );
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await axiosPrivateClient.patch("/profile/update", data);
    return response.data;
  },
};

export default userService;
