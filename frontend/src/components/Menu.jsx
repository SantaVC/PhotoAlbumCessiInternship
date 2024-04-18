import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/thunks/authThunks";
import { AiOutlineLoading } from "react-icons/ai";
import { selectLoading } from "../redux/slices/authSlice";
import { Button } from "./index";
import useUserAuth from "../hooks/useUserAuth";

const Menu = ({ setIsMenuOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const { token } = useUserAuth();

  const handleClickLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    setIsMenuOpen(false);
    navigate("/login");
  };

  const handleClickChangePassword = async () => {
    setIsMenuOpen(false);
    setIsModalOpen(true);
  };

  return (
    <ul className="absolute right-0 top-[50px] flex flex-col gap-3 p-3 bg-sky-300 rounded animate-opacity leading-none">
      <li className="min-w-[100px]">
        <Link
          className="hover:underline p-1"
          to="/profile/edit"
          onClick={() => setIsMenuOpen(false)}
        >
          Edit profile
        </Link>
      </li>

      <li className="min-w-[100px]">
        <Button
          className="text-left hover:underline p-1"
          disabled={loading}
          onClick={handleClickChangePassword}
        >
          Change password
        </Button>
      </li>

      <li className="min-w-[100px]">
        {!token ? (
          <Link
            className="text-left hover:underline p-1"
            onClick={() => setIsMenuOpen(false)}
            to={"/login"}
          >
            Войти
          </Link>
        ) : (
          <Button
            className="text-left hover:underline p-1"
            disabled={loading}
            onClick={handleClickLogout}
          >
            {!loading ? (
              "Выйти"
            ) : (
              <AiOutlineLoading size={20} className="animate-spin" />
            )}
          </Button>
        )}
      </li>
    </ul>
  );
};

export default Menu;
