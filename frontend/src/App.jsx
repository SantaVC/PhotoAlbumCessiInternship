import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import SignUpModal from "./components/SignUp/SignUpModal";
import SignInModal from "./components/SignIn/SignInModal";

const App = () => {
  console.log("App rendered");

  // useEffect(() => {
  //   const fetch = async () => {
  //     const response = await instance.post("/signup", {
  //       name: 'your_name',
  //       email: 'your_email',
  //       password: 'your_password'
  //     });
  //
  //     console.log(response);
  //   };
  //
  //   fetch();
  // }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignInModal />} />
        <Route path="/signup" element={<SignUpModal />} />
      </Routes>
    </div>
  );
};

export default App;
