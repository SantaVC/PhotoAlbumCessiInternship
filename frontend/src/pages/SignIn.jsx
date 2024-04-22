import { Navigate } from "react-router-dom";
import { SignLayout, SignInForm } from "../components";
import useUserAuth from "../hooks/useUserAuth";

const SignIn = () => {
  const { token } = useUserAuth();

  return token ? (
    <Navigate to={"/"} />
  ) : (
    <SignLayout>
      <SignInForm />
    </SignLayout>
  );
};

export default SignIn;
