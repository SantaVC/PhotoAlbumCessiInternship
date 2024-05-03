import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
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
