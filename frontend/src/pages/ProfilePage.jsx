import { useEffect } from "react";
import useUserAuth from "../hooks/useUserAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAuth,
  selectLoading,
  setLoading,
} from "../redux/slices/authSlice";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const loading = useSelector(selectLoading);
  const { user } = useUserAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        dispatch(setLoading(true));

        const response = await axiosPrivate.get("/profile");
        console.log(response.data);
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          dispatch(resetAuth());
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProfile();
  }, [dispatch, axiosPrivate]);

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
