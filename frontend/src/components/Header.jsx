import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { IoNotifications } from "react-icons/io5";
import { Button, ChangePasswordModal, Menu, ToggleTheme } from "./index";

const Header = ({ theme, setTheme }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current) {
        return;
      }

      if (!menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("click", handler, true);

    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const handleToggleTheme = () => {
    localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    setTheme((cur) => (cur === "dark" ? "light" : "dark"));
  };

  return (
    <header className="flex justify-between py-4">
      <div className="flex gap-6">
        <Link
          to={"/"}
          className="f-bold block bg-purple-600 py-2 px-4 border border-black rounded"
        >
          Logo
        </Link>

        <input
          className="min-w-64 border border-neutral-700 rounded-md py-1 px-2 text-base dark:bg-neutral-300"
          type="text"
        />
      </div>

      <div className="flex items-center gap-3">
        <ToggleTheme
          isChecked={theme === "dark"}
          handleChange={handleToggleTheme}
        />

        <Button className="relative p-1 hover:text-white hover:outline hover:bg-sky-500 outline-sky-300 rounded-md">
          <IoNotifications className="dark:text-white" size={30} />
          <div className="block w-3 h-3 absolute top-1 right-1 bg-red-500 rounded-full"></div>
        </Button>

        <Link
          to={"/profile"}
          className="flex items-center justify-center p-1 hover:text-white hover:outline hover:bg-sky-500 outline-sky-300 rounded-md"
        >
          <FaUserCircle className="dark:text-white" size={30} />
        </Link>

        <div ref={menuRef} className="relative">
          <Button
            onClick={() => setIsMenuOpen((current) => !current)}
            className="p-1 hover:text-white hover:outline hover:bg-sky-500 outline-sky-300 rounded-md"
          >
            <CiMenuKebab className="dark:text-white" size={30} />
          </Button>

          {isMenuOpen && (
            <Menu
              setIsModalOpen={setIsModalOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          )}
        </div>

        {isModalOpen && <ChangePasswordModal setIsOpen={setIsModalOpen} />}
      </div>
    </header>
  );
};

export default Header;
