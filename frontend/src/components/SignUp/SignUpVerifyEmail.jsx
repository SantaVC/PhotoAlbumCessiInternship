import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getUser, resendVerification } from "../../redux/thunks/authThunks";
import { Button, Modal } from "../index";
import { selectLoading } from "../../redux/slices/authSlice";
import useUserAuth from "../../hooks/useUserAuth";

const SignUpVerifyEmail = () => {
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const { user } = useUserAuth();

  if (!user) {
    return <Navigate to={"/signup"} />;
  }

  const handleClick = async (userData) => {
    try {
      await dispatch(resendVerification(userData.email)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchUser = async () => {
    try {
      setError("");

      const user = await dispatch(getUser()).unwrap();

      if (!user.email_verified_at) {
        setError("Verify your email.");
        return;
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal>
      <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] max-w-96 bg-white rounded-xl">
        <div className="relative flex flex-col gap-5 justify-center items-center h-full p-6">
          <h2 className="text-center text-3xl f-regular">Verify Your Email</h2>

          <p className="max-w-[300px] f-regular">
            We have sent you a letter to
            <span className="f-bold"> {user?.email}</span>. Follow the link in
            the letter to confirm that the email is yours to secure your
            account.
          </p>

          {error && (
            <p className="self-start text-red-500 f-regular">{error}</p>
          )}

          <Button
            className="self-start text-sm underline underline-offset-2 decoration-sky-300 f-regular"
            onClick={() => handleClick(user)}
          >
            Send letter again
          </Button>

          {!user?.email_verified_at ? (
            <Button
              disabled={loading}
              className="border border-neutral-500 px-5 py-2 f-bold hover:bg-sky-300  disabled:cursor-not-allowed"
              onClick={handleFetchUser}
            >
              Proceed
            </Button>
          ) : (
            <Link
              className="border border-neutral-500 px-5 py-2 f-bold hover:bg-sky-300"
              to={"/login"}
            >
              Proceed
            </Link>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SignUpVerifyEmail;
