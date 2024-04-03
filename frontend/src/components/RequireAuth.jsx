import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUserAuth from "../hooks/useUserAuth";

const RequireAuth = () => {
  const { token, user } = useUserAuth();
  const location = useLocation();

  if (token && user?.email_verified_at !== null) {
    return <Outlet />;
  }

  return <Navigate to="/verify-email" state={{ from: location }} replace />;
};

export default RequireAuth;
