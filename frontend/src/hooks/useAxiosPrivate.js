import { useEffect } from "react";
import { axiosPrivateClient } from "../axios";
import useRefreshToken from "./useRefreshToken";
import useUserAuth from "./useUserAuth";

const useAxiosPrivate = () => {
  const { token } = useUserAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosPrivateClient.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        console.log(config);
        return config;
      },
      (error) => {
        console.log(error);
        Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivateClient.interceptors.response.use(
      (response) => response,

      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();

          console.log(`Prev token: ${token}\nNew token: ${newAccessToken}`);

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
