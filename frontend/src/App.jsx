import { Routes, Route } from "react-router-dom";
import {
  SignInModal,
  SignUpModal,
  Header,
  RequireAuth,
  PersistLogin,
  ResetPasswordModal,
} from "./components/index";
import { ProfilePage, LayoutPage, HomePage } from "./pages/index";

const App = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <Header />

      <Routes>
        <Route path="/" element={<LayoutPage />}>
          {/* Protected routes */}
          <Route element={<PersistLogin />}>
            <Route path="/login" element={<SignInModal />} />
            <Route path="/signup" element={<SignUpModal />} />
            <Route path="/reset-password" element={<ResetPasswordModal />} />

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
