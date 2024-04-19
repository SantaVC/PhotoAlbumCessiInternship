import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { CgCloseR } from "react-icons/cg";
import { AiOutlineLoading } from "react-icons/ai";
import { getUser, resendVerification } from "../../redux/thunks/authThunks";
import { Button, BasicModal } from "../index";
import { selectLoading } from "../../redux/slices/authSlice";
import { useCountdown } from "../../hooks/useCountdown";
import useUserAuth from "../../hooks/useUserAuth";

const SignUpVerifyEmail = () => {
  const [error, setError] = useState("");
  const { seconds, setSeconds } = useCountdown();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const { user, token } = useUserAuth();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    setSeconds(10);
  }, [setSeconds]);

  if (user?.email_verified_at) {
    return <Navigate to={from} />;
  }

  if (!token) {
    return <Navigate to={"/sign-up"} />;
  }

  const handleClick = async (userData) => {
    try {
      setSeconds(10);
      // await dispatch(resendVerification(userData.email)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchUser = async () => {
    try {
      setError("");

      const userData = await dispatch(getUser()).unwrap();

      if (!userData.email_verified_at) {
        setError("Verify your email.");
        return;
      }

      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BasicModal>
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

          <div className="self-start flex items-center justify-center">
            <Button
              disabled={seconds > 0}
              className={`self-start mr-2 text-sm underline underline-offset-2 decoration-sky-300 f-regular ${
                seconds > 0 &&
                " text-neutral-400 decoration-neutral-400 cursor-not-allowed"
              }`}
              onClick={() => handleClick(user)}
            >
              Send letter again
            </Button>
            <span className="text-sm f-regular">
              {seconds > 0 && `0:${seconds >= 10 ? seconds : "0" + seconds}`}
            </span>
          </div>

          {!user?.email_verified_at ? (
            <Button
              disabled={loading}
              className="min-w-[100px] border border-neutral-500 px-5 py-2 f-bold hover:bg-sky-300 disabled:cursor-not-allowed"
              onClick={handleFetchUser}
            >
              {loading ? (
                <AiOutlineLoading size={24} className="animate-spin" />
              ) : (
                "Proceed"
              )}
            </Button>
          ) : (
            <Link
              className="border border-neutral-500 px-5 py-2 f-bold hover:bg-sky-300"
              to={"/sign-in"}
            >
              Proceed
            </Link>
          )}

          <Link
            to={"/"}
            className="absolute top-[-32px] right-[-32px] p-1 opacity-60 hover:opacity-100 hover:rotate-90 transition-[transform] duration-300"
          >
            <CgCloseR size={30} />
          </Link>
        </div>
      </div>
    </BasicModal>
  );
};

export default SignUpVerifyEmail;
