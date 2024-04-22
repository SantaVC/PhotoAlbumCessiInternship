import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link as RouterLink,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { getUser, resendVerification } from "../../redux/thunks/authThunks";
import { selectLoading } from "../../redux/slices/authSlice";
import { useCountdown } from "../../hooks/useCountdown";
import useUserAuth from "../../hooks/useUserAuth";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";

const SignUpVerifyEmail = () => {
  const [isOpen, setIsOpen] = useState(true);

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
    return <Navigate to={"/"} />;
  }

  const handleClose = () => {
    setIsOpen(false);
    navigate("/");
  };

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
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle variant="h5" textAlign="center">
        Confirm your email
      </DialogTitle>

      <DialogContent>
        <DialogContentText mb={2}>
          We have sent you a letter to
          <Typography component="span" variant="body1" fontWeight={700}>
            {" "}
            {user?.email}
          </Typography>
          . Follow the link in the letter to confirm that the email is yours to
          secure your account.
        </DialogContentText>

        {error && (
          <Typography variant="body1" component="p" color="error">
            {error}
          </Typography>
        )}

        <Button disabled={seconds > 0} onClick={() => handleClick(user)}>
          Send letter again{" "}
          {seconds > 0 && `0:${seconds >= 10 ? seconds : "0" + seconds}`}
        </Button>
      </DialogContent>

      <DialogActions>
        {!user?.email_verified_at ? (
          <Button
            variant="contained"
            disabled={loading}
            onClick={handleFetchUser}
          >
            Proceed
          </Button>
        ) : (
          <Button component={RouterLink} to={"/sign-in"}>
            Proceed
          </Button>
        )}

        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
    // <BasicModal>
    //   <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] max-w-96 bg-white rounded-xl">
    //     <div className="relative flex flex-col gap-5 justify-center items-center h-full p-6">
    //       <h2 className="text-center text-3xl f-regular">Verify Your Email</h2>

    //       <p className="max-w-[300px] f-regular">
    //         We have sent you a letter to
    //         <span className="f-bold"> {user?.email}</span>. Follow the link in
    //         the letter to confirm that the email is yours to secure your
    //         account.
    //       </p>

    //

    //       <Link
    //         to={"/"}
    //         className="absolute top-[-32px] right-[-32px] p-1 opacity-60 hover:opacity-100 hover:rotate-90 transition-[transform] duration-300"
    //       >
    //         <CgCloseR size={30} />
    //       </Link>
    //     </div>
    //   </div>
    // </BasicModal>
  );
};

export default SignUpVerifyEmail;
