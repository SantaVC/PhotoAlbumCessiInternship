import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { setUser } from "./redux/slices/authSlice";
import { getLocalUser } from "./services/authService";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import SignUpModal from "./components/SignUp/SignUpModal";
import SignInModal from "./components/SignIn/SignInModal";

const App = () => {
  const dispatch = useDispatch();
  const user = getLocalUser();

  useEffect(() => {
    dispatch(setUser(user));
    console.log("user set from storage");
  }, [dispatch, user]);

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/login" element={<SignInModal />} />
          <Route path="/signup" element={<SignUpModal />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
