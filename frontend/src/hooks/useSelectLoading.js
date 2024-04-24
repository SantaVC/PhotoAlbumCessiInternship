import { useSelector } from "react-redux";

const useSelectLoading = () => {
  return useSelector((state) => state.auth.loading);
};

export default useSelectLoading;
