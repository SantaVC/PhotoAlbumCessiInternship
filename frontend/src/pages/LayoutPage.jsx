import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import { resetAuth } from "../redux/slices/authSlice";
import { getUser } from "../redux/thunks/authThunks";
import useUserAuth from "../hooks/useUserAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Appbar } from "../components";

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
    <>
      <Appbar />

      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
};

export default LayoutPage;
