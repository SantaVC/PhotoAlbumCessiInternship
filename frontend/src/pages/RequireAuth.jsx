import { Navigate, Outlet, useLocation } from "react-router-dom";
import useSelectUserAuth from "../hooks/useSelectUserAuth";

const RequireAuth = () => {
  const { token } = useSelectUserAuth();
  const location = useLocation();

  if (token) {
    return <Outlet />;
  }

  console.log("navigated to " + location?.pathname);

  return <Navigate to={location?.pathname || "/"} />;
};

export default RequireAuth;
