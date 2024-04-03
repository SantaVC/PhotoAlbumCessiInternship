import { useState } from "react";
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
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? "dark" : null}>
      <div className="min-h-[100dvh] bg-white dark:bg-neutral-900 transition-colors duration-100">
        <div className="max-w-screen-xl mx-auto px-4 bg-white dark:bg-neutral-900 transition-colors duration-100">
          <Header isDark={isDark} setIsDark={setIsDark} />

          <Routes>
            <Route path="/login" element={<SignInModal />} />
            <Route path="/signup" element={<SignUpModal />} />
            <Route path="/reset-password" element={<ResetPasswordModal />} />

            <Route element={<PersistLogin />}>
              <Route path="/" element={<LayoutPage />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/verify-email" element={<SignUpVerifyEmail />} />

                {/* Protected routes */}
                <Route element={<RequireAuth />}>
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
