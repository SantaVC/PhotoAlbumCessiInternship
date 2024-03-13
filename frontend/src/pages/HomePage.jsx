import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  const user = useSelector(selectUser);

  return (
    <div>
      nickname: {user?.nickname}
      <Outlet />
    </div>
  );
};

export default HomePage;
