import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import useRefreshToken from "../hooks/useRefreshToken";
import useSelectUserAuth from "../hooks/useSelectUserAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const refresh = useRefreshToken();
  const { token } = useSelectUserAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        console.log("refreshing the token");
        setIsLoading(true);
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        console.log("finished refreshing the token");
        isMounted && setIsLoading(false);
      }
    };

    if (!token) {
      console.log("verify called");
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, dispatch, token, refresh]);

  return (
    <>
      {isLoading && (
        <Backdrop sx={{ color: "#fff", zIndex: 1000 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <Outlet />
    </>
  );
};

export default PersistLogin;
