import { Routes, Route } from "react-router-dom";
import {
  SignInModal,
  SignUpModal,
  Header,
  RequireAuth,
} from "./components/index";
import { HomePage, ProfilePage } from "./pages/index";

const App = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />}>
          {/* Public routes */}
          <Route path="/login" element={<SignInModal />} />
          <Route path="/signup" element={<SignUpModal />} />
        </Route>

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
