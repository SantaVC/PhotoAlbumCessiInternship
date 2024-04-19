import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Navbar, Userbar, ToggleTheme, Logo } from "./index";

function Appbar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo sx={{ fontSize: 20 }} />

          <Navbar />

          <ToggleTheme />

          <Userbar />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Appbar;
