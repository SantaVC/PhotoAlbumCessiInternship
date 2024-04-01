import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useUserAuth from "../hooks/useUserAuth";
import { getUser } from "../redux/thunks/authThunks";
import { resetAuth } from "../redux/slices/authSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { user, token } = useUserAuth();

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        isMounted && (await dispatch(getUser()).unwrap());
      } catch (error) {
        dispatch(resetAuth());
      }
    };

    if (!user) {
      fetchProfile();
    }

    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, dispatch, user, token]);

  return <section>HomePage</section>;
};

export default HomePage;
