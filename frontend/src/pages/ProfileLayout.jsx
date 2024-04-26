import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getUser } from "../redux/thunks/authThunks";
import { resetAuth } from "../redux/slices/authSlice";
import { Backdrop, CircularProgress } from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useSelectUserAuth from "../hooks/useSelectUserAuth";

const ProfileLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { user, profile } = useSelectUserAuth();

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        console.log("fetching user");
        isMounted && (await dispatch(getUser()).unwrap());
      } catch (error) {
        console.log(error);
        dispatch(resetAuth());
      } finally {
        console.log("finished fetching user");
        setIsLoading(false);
      }
    };

    if (!user) {
      fetchProfile();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, dispatch, user, profile]);

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

export default ProfileLayout;
