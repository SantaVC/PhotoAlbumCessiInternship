import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ResetPasswordModal, SignUpVerifyEmail } from "./components/index";
import {
  ProfilePage,
  LayoutPage,
  HomePage,
  EditProfile,
  SignIn,
  SignUp,
  RequireAuth,
  PersistLogin,
  RequireVerifyEmail,
} from "./pages/index";
import { useThemeContext } from "./theme/useThemeContext";

const App = () => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<LayoutPage />}>
            <Route path="/" element={<HomePage />} />

            {/* Protected routes */}
            <Route element={<RequireAuth />}>
              <Route element={<RequireVerifyEmail />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/edit" element={<EditProfile />} />
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
