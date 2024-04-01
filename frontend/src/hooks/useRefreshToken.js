import { useDispatch } from "react-redux";
import { setLoading, setToken } from "../redux/slices/authSlice";
import { axiosPrivateClient } from "../axios";
import { logoutUser } from "../redux/thunks/authThunks";
import { useCallback } from "react";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = useCallback(async () => {
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
      // await dispatch(logoutUser()).unwrap();
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return refresh;
};

export default useRefreshToken;
