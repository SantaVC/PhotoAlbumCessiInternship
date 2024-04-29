import { useSelector } from "react-redux";

const useSelectPosts = () => {
  return useSelector((state) => state.posts);
};

export default useSelectPosts;
