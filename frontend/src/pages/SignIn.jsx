import { Navigate } from "react-router-dom";
import { SignLayout, SignInForm } from "../components";
import useSelectUserAuth from "../hooks/useSelectUserAuth";

const SignIn = () => {
  const { token } = useSelectUserAuth();

  return token ? (
    <Navigate to={"/"} />
  ) : (
    <SignLayout>
      <SignInForm />
    </SignLayout>
  );
};

export default SignIn;
