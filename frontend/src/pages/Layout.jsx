import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import { resetAuth } from "../redux/slices/authSlice";
import { getUser } from "../redux/thunks/authThunks";
import useSelectUserAuth from "../hooks/useSelectUserAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Appbar } from "../components";

const Layout = () => {
  return (
    <>
      <Appbar />

      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
