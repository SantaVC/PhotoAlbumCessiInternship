import { Routes, Route } from "react-router-dom";
import {
  SignInModal,
  SignUpModal,
  Header,
  RequireAuth,
  PersistLogin,
} from "./components/index";
import { ProfilePage, LayoutPage } from "./pages/index";

const App = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <Header />

      <Routes>
        <Route path="/" element={<LayoutPage />}>
          {/* Public routes */}
          <Route path="/login" element={<SignInModal />} />
          <Route path="/signup" element={<SignUpModal />} />

          {/* Protected routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
