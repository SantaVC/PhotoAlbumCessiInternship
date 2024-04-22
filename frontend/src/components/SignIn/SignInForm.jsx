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
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Button,
  Link,
  IconButton,
  Stack,
} from "@mui/material";
import { loginUser } from "../../redux/thunks/authThunks";

const schema = z.object({
  email: z.string().email("Invalid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const SignInForm = () => {
  const [isHidden, setIsHidden] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();

      console.log("Login success");

      // navigates user to where they wanted to go
      // for expample to Profile page if they clicked on Profile icon
      navigate(from);
      reset();
    } catch (error) {
      console.log("Login failed", error);
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
        Sign in
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
            {...register("email")}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
              type={isHidden ? "password" : "text"}
              id="password"
              autoComplete="current-password"
            />

            <IconButton
              tabIndex={-1}
              component="div"
              sx={{
                position: "absolute",
                top: "50%",
                right: 4,
                translate: "0 -50%",
              }}
              onClick={() => setIsHidden((current) => !current)}
            >
              {isHidden ? (
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
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
          Sign In
        </Button>

        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>

          <Grid item>
            <Link variant="body2" component={RouterLink} to="/sign-up">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default SignInForm;
