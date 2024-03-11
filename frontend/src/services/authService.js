import instance from "../axios";

const authService = {
  register: async (userData) => {
    const response = await instance.post("/signup", userData);
    return response.data;
  },
  login: async (userData) => {
    const response = await instance.post("/login", userData);
    return response.data;
  },
};

export default authService;
