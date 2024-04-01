import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { resetAuth } from "../redux/slices/authSlice";
import { getUser } from "../redux/thunks/authThunks";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useUserAuth from "../hooks/useUserAuth";

const LayoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const { user, token } = useUserAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchProfile = async () => {
      try {
        isMounted &&
          (await dispatch(
            getUser({
              signal: controller.signal,
            })
          ).unwrap());
      } catch (error) {
        dispatch(resetAuth());
      }
    };

    if (!user) {
      fetchProfile();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, navigate, dispatch, location, user, token]);

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default LayoutPage;
