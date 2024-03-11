import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";

const HomePage = () => {
  const user = useSelector(selectUser);

  return <div>nickname: {user?.nickname}</div>;
};

export default HomePage;
