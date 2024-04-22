import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import useUserAuth from "../hooks/useUserAuth";
import CircularProgress from "@mui/material/CircularProgress";
import { logoutUser } from "../redux/thunks/authThunks";
import { selectLoading } from "../redux/slices/authSlice";

const Userbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { token } = useUserAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    navigate("/sign-in");
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      {!token ? (
        loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button to="/sign-in" component={RouterLink} variant="contained">
              Sign In
            </Button>
            <Button to="/sign-up" component={RouterLink} variant="contained">
              Sign Up
            </Button>
          </Box>
        )
      ) : (
        <>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Link
                to="/profile"
                component={RouterLink}
                sx={{ color: "inherit" }}
              >
                Profile
              </Link>
            </MenuItem>

            <MenuItem sx={{ mt: 1 }} onClick={handleCloseUserMenu}>
              <Link
                onClick={handleLogout}
                disabled={loading}
                component="button"
                sx={{ color: "inherit" }}
              >
                Logout
              </Link>
            </MenuItem>
          </Menu>
        </>
      )}
    </Box>
  );
};

export default Userbar;
