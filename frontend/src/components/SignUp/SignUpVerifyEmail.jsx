import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Link as RouterLink,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
import { getUser, resendVerification } from "../../redux/thunks/authThunks";
import { useCountdown } from "../../hooks/useCountdown";
import useSelectUserAuth from "../../hooks/useSelectUserAuth";
import useSelectLoading from "../../hooks/useSelectLoading";

const SignUpVerifyEmail = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [error, setError] = useState("");
  const { seconds, setSeconds } = useCountdown();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelectLoading();
  const { user, token } = useSelectUserAuth();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    setSeconds(10);
  }, [setSeconds]);

  if (user?.email_verified_at) {
    return <Navigate to={"/profile"} />;
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
      console.log("get user");
      const { user } = await dispatch(getUser()).unwrap();

      if (!user?.email_verified_at) {
        setError("Verify your email.");
        return;
      }

      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message);
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
  );
};

export default SignUpVerifyEmail;
