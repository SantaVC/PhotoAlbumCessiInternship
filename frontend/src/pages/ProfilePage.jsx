import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useUserAuth from "../hooks/useUserAuth";
import {
  resetAuth,
  selectLoading,
  setUser,
  setLoading,
} from "../redux/slices/authSlice";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const axiosPrivate = useAxiosPrivate();
  const loading = useSelector(selectLoading);
  const { user } = useUserAuth();

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
        console.log(error);

        dispatch(resetAuth());

        if (error?.response?.status === 401) {
          navigate("/login", { state: { from: location }, replace: true });
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, dispatch, location, navigate]);

  return (
    <section>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>ProfilePage</p>
          <p>Игорь молодец</p>
          <p>nickname: {user?.nickname}</p>
        </>
      )}
    </section>
  );
};

export default ProfilePage;
