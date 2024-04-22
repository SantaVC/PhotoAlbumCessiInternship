import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import {
  Avatar,
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Link,
  IconButton,
  Stack,
} from "@mui/material";
import { passwordRegex, nicknameRegex } from "../../constants";
import { registerUser } from "../../redux/thunks/authThunks";

const schema = z
  .object({
    nickname: z
      .string()
      .min(4, "Nickname must be at least 4 characters.")
      .max(20, "Nickname must be maximum 20 characters.")
      .regex(
        nicknameRegex,
        "Nickname must contain only english letters or numbers."
      ),
    email: z
      .string()
      .email("Invalid email.")
      .max(255, "Email must me maximum 255 characters."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(20, "Password must be maximum 20 characters long.")
      .regex(
        passwordRegex,
        "Password must contain one uppercase, one lowercase, one number and no special characters."
      ),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match.",
    path: ["password_confirmation"],
  });

const SignUpForm = ({ setIsSubmitted }) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmHidden, setIsConfirmHidden] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();

      // setIsSubmitted(true);
      reset();
      navigate("/verify-email");
    } catch (error) {
      console.log("Register failed");
      setError("root", { message: error.message });
    }
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h1" variant="h4">
        Sign Up
      </Typography>

      <Stack
        direction="column"
        gap={2}
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3, width: 1 }}
      >
        <Box>
          <TextField
            {...register("nickname")}
            required
            fullWidth
            id="nickname"
            label="Nickname"
            name="nickname"
            autoFocus
          />

          {errors.nickname && (
            <Typography variant="body1" color="error">
              {errors.nickname.message}
            </Typography>
          )}
        </Box>

        <Box>
          <TextField
            {...register("email")}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />

          {errors.email && (
            <Typography variant="body1" color="error">
              {errors.email.message}
            </Typography>
          )}
        </Box>

        <Box>
          <Box position="relative">
            <TextField
              {...register("password")}
              required
              fullWidth
              name="password"
              label="Password"
              type={isPasswordHidden ? "password" : "text"}
              id="password"
              autoComplete="current-password"
            />

            <IconButton
              component="div"
              tabIndex={-1}
              sx={{
                position: "absolute",
                top: "50%",
                right: 4,
                translate: "0 -50%",
              }}
              onClick={() => setIsPasswordHidden((current) => !current)}
            >
              {isPasswordHidden ? (
                <VisibilityOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
            </IconButton>
          </Box>

          {errors.password && (
            <Typography component="p" variant="body1" color="error">
              {errors.password.message}
            </Typography>
          )}
        </Box>

        <Box>
          <Box position="relative">
            <TextField
              {...register("password_confirmation")}
              required
              fullWidth
              name="password_confirmation"
              label="Confirm password"
              type={isConfirmHidden ? "password" : "text"}
              id="password_confirmation"
              autoComplete="current-password"
            />

            <IconButton
              component="div"
              tabIndex={-1}
              sx={{
                position: "absolute",
                top: "50%",
                right: 4,
                translate: "0 -50%",
              }}
              onClick={() => setIsConfirmHidden((current) => !current)}
            >
              {isConfirmHidden ? (
                <VisibilityOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
            </IconButton>
          </Box>

          {errors.password_confirmation && (
            <Typography component="p" variant="body1" color="error">
              {errors.password_confirmation.message}
            </Typography>
          )}
        </Box>

        {errors.root && (
          <Typography component="p" variant="body1" color="error">
            {errors.root.message}
          </Typography>
        )}

        <Button
          disabled={isSubmitting}
          fullWidth
          type="submit"
          variant="contained"
          disableTouchRipple
        >
          Sign Up
        </Button>

        <Grid container>
          <Grid item>
            <Link variant="body2" component={RouterLink} to="/sign-in">
              {"Already have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default SignUpForm;
