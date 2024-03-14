import { useSelector } from "react-redux";

const useUserAuth = () => {
  const auth = useSelector((state) => state.auth.userAuth);
  console.log(auth);
  return auth;
};

export default useUserAuth;
