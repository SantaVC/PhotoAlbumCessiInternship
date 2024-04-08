import { axiosPrivateClient } from "../axios";

const userService = {
  changeNickname: async (data) => {
    const response = await axiosPrivateClient.patch("/change-nickname", data);
    return response.data;
  },

  resetPassword: async (data) => {
    const response = await axiosPrivateClient.post("/reset-password", data);
    return response.data;
  },
};

export default userService;
