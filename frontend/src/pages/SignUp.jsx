import { useState } from "react";
import { Navigate } from "react-router-dom";
import { SignLayout, SignUpForm } from "../components";
import useSelectUserAuth from "../hooks/useSelectUserAuth";

const SignIn = () => {
  const { token } = useSelectUserAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user } = useSelectUserAuth();

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
