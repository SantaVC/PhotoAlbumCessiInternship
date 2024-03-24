import { useEffect } from "react";
import { axiosPrivateClient } from "../axios";
import useRefreshToken from "./useRefreshToken";
import useUserAuth from "./useUserAuth";

const useAxiosPrivate = () => {
  const { token } = useUserAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosPrivateClient.interceptors.request.use(
      // race condition

      // Remember me переделать

      (config) => {
        if (!config.headers["Authorization"]) {
          // убрать отправку токена из конфига при login & sign up
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivateClient.interceptors.response.use(
      (response) => response,

      async (error) => {
        const prevRequest = error?.config;

        console.log(error);
        const errorStatus = error?.response?.status;

        if (errorStatus === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();

          console.log(`Prev token:\n${token}\nNew token:\n${newAccessToken}`);

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosPrivateClient(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateClient.interceptors.request.eject(requestIntercept);
      axiosPrivateClient.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, token]);

  return axiosPrivateClient;
};

export default useAxiosPrivate;
