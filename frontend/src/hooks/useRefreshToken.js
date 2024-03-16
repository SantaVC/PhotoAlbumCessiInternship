import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/authSlice";
import axiosClient, { axiosPrivateClient } from "../axios";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const response = await axiosPrivateClient.post("/refresh");

      dispatch(setToken(response.data.token));

      return response.data.token;
    } catch (error) {
      console.log(error);
    }
  };

  return refresh;
};

export default useRefreshToken;
