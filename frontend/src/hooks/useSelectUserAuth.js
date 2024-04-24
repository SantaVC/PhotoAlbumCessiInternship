import { useSelector } from "react-redux";

const useSelectUserAuth = () => {
  return useSelector((state) => state.auth.userAuth);
};

export default useSelectUserAuth;
