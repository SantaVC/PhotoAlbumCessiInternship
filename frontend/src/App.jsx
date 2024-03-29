import { Routes, Route } from "react-router-dom";
import {
  SignInModal,
  SignUpModal,
  Header,
  RequireAuth,
  PersistLogin,
  ResetPasswordModal,
  SignUpVerifyEmail,
} from "./components/index";
import { ProfilePage, LayoutPage, HomePage } from "./pages/index";

const App = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <Header />

      <Routes>
        <Route path="/login" element={<SignInModal />} />
        <Route path="/signup" element={<SignUpModal />} />
        <Route path="/verify-email" element={<SignUpVerifyEmail />} />
        <Route path="/reset-password" element={<ResetPasswordModal />} />

        <Route element={<PersistLogin />}>
          <Route path="/" element={<LayoutPage />}>
            {/* Protected routes */}
            <Route element={<RequireAuth />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
