import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../redux/slices/authSlice";
import Button from "./ui/Button";
import { logoutUser } from "../redux/thunks/authThunks";

const Menu = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  console.log(user);

  const handleClick = () => {
    dispatch(logoutUser());
    setIsOpen(false);
  };

  return (
    <ul className="absolute right-0 top-[50px] flex flex-col gap-2 p-3 bg-sky-200 rounded">
      <li className="border-b border-neutral-400 text-lg text-center">
        {!user ? (
          <Link onClick={() => setIsOpen(false)} to={"/login"}>
            Войти
          </Link>
        ) : (
          <Button onClick={() => handleClick()}>Выйти</Button>
        )}
      </li>
      <li className="border-b border-neutral-400 text-lg text-center">Тема</li>
    </ul>
  );
};

export default Menu;
