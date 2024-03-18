import { Outlet } from "react-router-dom";

const LayoutPage = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default LayoutPage;
