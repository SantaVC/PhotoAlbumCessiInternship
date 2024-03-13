import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/thunks/authThunks";
import { AiOutlineLoading } from "react-icons/ai";
import { getAuthToken } from "../services/authService";
import { selectLoading } from "../redux/slices/authSlice";
import Button from "./ui/Button";

const Menu = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const token = getAuthToken();

  const handleClick = async () => {
    await dispatch(logoutUser()).unwrap();
    setIsOpen(false);
  };

  return (
    <ul className="absolute right-0 top-[50px] flex flex-col gap-3 p-4 bg-sky-200 rounded animate-opacity">
      <li className="f-regular">
        {!token ? (
          <Link
            className="block min-w-[100px] bg-sky-800 px-4 py-2 rounded text-white text-lg text-center"
            onClick={() => setIsOpen(false)}
            to={"/login"}
          >
            Войти
          </Link>
        ) : (
          <Button
            className="min-w-[100px] bg-sky-800 px-4 py-2 rounded text-white text-lg disabled:cursor-not-allowed rounded"
            disabled={loading}
            onClick={() => handleClick()}
          >
            {!loading ? (
              "Выйти"
            ) : (
              <AiOutlineLoading size={28} className="animate-spin" />
            )}
          </Button>
        )}
      </li>
      <li className="min-w-[100px] bg-sky-800 px-4 py-2 rounded text-white text-lg text-center f-regular">
        Тема
      </li>
    </ul>
  );
};

export default Menu;
