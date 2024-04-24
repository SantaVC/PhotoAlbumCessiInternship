import { Navigate, Outlet } from "react-router-dom";
import useSelectUserAuth from "../hooks/useSelectUserAuth";

const RequireVerifyEmail = () => {
  const { user } = useSelectUserAuth();

  if (user?.email_verified_at !== null) {
    return <Outlet />;
  }

  console.log("navigated to /verify-email");

  return <Navigate to="/verify-email" />;
};

export default RequireVerifyEmail;
