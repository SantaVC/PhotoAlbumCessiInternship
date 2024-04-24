import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { axiosPrivateClient } from "../axios";
import useRefreshToken from "./useRefreshToken";
import useSelectUserAuth from "./useSelectUserAuth";

const threshold = 30; //seconds before the token expires;

const useAxiosPrivate = () => {
  const { token } = useSelectUserAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosPrivateClient.interceptors.request.use(
      async (config) => {
        const isAuthRequired =
          !["/sign-in", "/sign-up", "/refresh", "/email/resend"].includes(
            config.url
          ) && !config.headers["Authorization"];

        console.log(config.url, isAuthRequired);

        if (isAuthRequired && token) {
          // if auth is required && have the token,
          // check if the token is about to expire ->

          const now = Math.floor(Date.now() / 1000);
          const decoded = jwtDecode(token);
          const expirationTime = decoded?.exp;
          const timeDifference = expirationTime - now;
          const isAboutToExpire = timeDifference <= threshold;

          timeDifference - threshold > 0 &&
            console.log(
              `Seconds before refresh: ${timeDifference - threshold}`
            );

          if (isAboutToExpire) {
            // if the token is about to expire, refresh all the tokens, set the header with the new token
            try {
              console.log("Token is about to expire, refreshing the tokens...");

              const newAccessToken = await refresh();
              config.headers["Authorization"] = `Bearer ${newAccessToken}`;

              console.log("Tokens successfully refreshed.");
            } catch (error) {
              console.log(
                "Error refreshing the about to expire token.\n",
                error
              );
            }
          } else {
            // else, set the existing token
            config.headers["Authorization"] = `Bearer ${token}`;
          }
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
