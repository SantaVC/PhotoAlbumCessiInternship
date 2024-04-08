import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { resetAuth } from "../redux/slices/authSlice";
import { getUser } from "../redux/thunks/authThunks";
import useUserAuth from "../hooks/useUserAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const LayoutPage = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { user } = useUserAuth();

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        console.log("fetching the user");
        isMounted && (await dispatch(getUser()).unwrap());
      } catch (error) {
        dispatch(resetAuth());
      } finally {
        console.log("finished fetching the user");
      }
    };

    if (!user) {
      fetchProfile();
    }

    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, dispatch, user]);

  return (
    <main className="flex-1">
      <Outlet />
    </main>
  );
};

export default LayoutPage;
