import { useDispatch } from "react-redux";
import { setLoading, setToken } from "../redux/slices/authSlice";
import { axiosPrivateClient } from "../axios";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      dispatch(setLoading(true));

      const response = await axiosPrivateClient.post("/refresh", "refresh", {
        withCredentials: true,
      });

      console.log(response);

      dispatch(setToken(response.data.token));

      return response.data.token;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return refresh;
};

export default useRefreshToken;
