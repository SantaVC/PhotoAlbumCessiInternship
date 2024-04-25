import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getUser } from "../redux/thunks/authThunks";
import { resetAuth } from "../redux/slices/authSlice";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useSelectUserAuth from "../hooks/useSelectUserAuth";

const ProfileLayout = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { user, profile } = useSelectUserAuth();

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        console.log("fetching user");
        isMounted && (await dispatch(getUser()).unwrap());
      } catch (error) {
        console.log(error);
        dispatch(resetAuth());
      } finally {
        console.log("finished fetching user");
      }
    };

    if (!user || !profile) {
      fetchProfile();
    }

    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, dispatch, user, profile]);

  return <Outlet />;
};

export default ProfileLayout;
