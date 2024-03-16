import { useSelector } from "react-redux";

const useUserAuth = () => {
  return useSelector((state) => state.auth.userAuth);
};

export default useUserAuth;
