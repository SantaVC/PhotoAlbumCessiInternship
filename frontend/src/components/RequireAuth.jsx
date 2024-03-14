import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUserAuth from "../hooks/useUserAuth";

const RequireAuth = () => {
  const { token } = useUserAuth();
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
