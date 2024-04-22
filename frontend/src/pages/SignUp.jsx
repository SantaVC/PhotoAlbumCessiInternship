import { useState } from "react";
import { Navigate } from "react-router-dom";
import { SignLayout, SignUpForm } from "../components";
import useUserAuth from "../hooks/useUserAuth";

const SignIn = () => {
  const { token } = useUserAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user } = useUserAuth();

  if (isSubmitted && user) {
    return <Navigate to={"/verify-email"} />;
  }

  return token ? (
    <Navigate to={"/"} />
  ) : (
    <SignLayout>
      <SignUpForm setIsSubmitted={setIsSubmitted} />
    </SignLayout>
  );
};

export default SignIn;
