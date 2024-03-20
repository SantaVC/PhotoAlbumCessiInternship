import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { selectPersist } from "../redux/slices/authSlice";
import useRefreshToken from "../hooks/useRefreshToken";
import useUserAuth from "../hooks/useUserAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const refresh = useRefreshToken();
  const persist = useSelector(selectPersist);
  const { token } = useUserAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        setIsLoading(true);
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    if (!token && persist) {
      console.log("verify called ", persist);
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, token, refresh, persist]);

  if (!persist) {
    return <Outlet />;
  } else if (isLoading) {
    return <p>...</p>;
  } else {
    return <Outlet />;
  }
};

export default PersistLogin;
