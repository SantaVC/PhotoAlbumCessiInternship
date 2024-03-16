import { Outlet } from "react-router-dom";
import useUserAuth from "../hooks/useUserAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import { Button } from "../components";

const HomePage = () => {
  const { token } = useUserAuth();
  const refresh = useRefreshToken();

  const handleClick = async () => {
    const refreshedToken = await refresh();

    console.log(`Prev token: ${token}\nRefresed token: ${refreshedToken}`);
  };

  return (
    <section>
      HomePage
      <Button
        className="p-2 border border-neutral-500"
        onClick={() => handleClick()}
      >
        Refresh
      </Button>
      <Outlet />
    </section>
  );
};

export default HomePage;
