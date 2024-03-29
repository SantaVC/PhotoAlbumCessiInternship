import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  resetAuth,
  selectLoading,
  setLoading,
  setUser,
} from "../redux/slices/authSlice";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useUserAuth from "../hooks/useUserAuth";

const LayoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const { user } = useUserAuth();
  const loading = useSelector(selectLoading);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchProfile = async () => {
      try {
        dispatch(setLoading(true));

        const response = await axiosPrivate.get("/user", {
          signal: controller.signal,
        });

        isMounted && dispatch(setUser(response.data));
      } catch (error) {
        dispatch(resetAuth());
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (!user) {
      fetchProfile();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, navigate, dispatch, location, user]);

  return loading ? (
    <p>...</p>
  ) : (
    <main>
      <Outlet />
    </main>
  );
};

export default LayoutPage;
