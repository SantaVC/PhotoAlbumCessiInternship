import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ResetPasswordModal, SignUpVerifyEmail } from "./components/index";
import {
  Profile,
  Layout,
  Home,
  EditProfile,
  SignIn,
  SignUp,
  RequireAuth,
  PersistLogin,
  RequireVerifyEmail,
  ProfileLayout,
} from "./pages/index";
import { useThemeContext } from "./theme/useThemeContext";

const App = () => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />

            {/* Protected routes */}
            <Route path="/" element={<RequireAuth />}>
              <Route element={<RequireVerifyEmail />}>
                <Route path="/profile" element={<ProfileLayout />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/edit" element={<EditProfile />} />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path="/verify-email" element={<SignUpVerifyEmail />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPasswordModal />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
