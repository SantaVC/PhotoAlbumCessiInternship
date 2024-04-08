import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { selectLoading } from "../redux/slices/authSlice";
import { getUser } from "../redux/thunks/authThunks";
import { Button, ChangeNicknameModal, UserAvatar } from "../components";
import useUserAuth from "../hooks/useUserAuth";

const cards = [
  {
    id: 0,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
];

const ProfilePage = () => {
  const { user } = useUserAuth();
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const [items, setItems] = useState(cards || []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFetchUser = () => {
    dispatch(getUser());
  };

  const handleAddItem = (item) => {
    setItems((current) => [...current, item]);
  };

  const handleDeleteItem = (item) => {
    setItems((current) => current.filter((card) => card.id !== item.id));
  };

  return (
    <section className="dark:text-white p-5">
      <header className="flex items-start gap-5 my-8">
        <UserAvatar />
        <ul className="flex flex-col h-full gap-1">
          <li className="flex gap-1">
            {loading ? (
              <AiOutlineLoading
                size={24}
                className="animate-spin dark:text-white"
              />
            ) : (
              <>
                {user?.nickname}

                <Button onClick={() => setIsModalOpen(true)}>
                  <MdEdit size={24} />
                </Button>
              </>
            )}
          </li>
          <li>Игорь молодец</li>
          <li>#test #test</li>
          <li className="mt-2 text-lg">123 publications</li>
        </ul>
        <Button primary onClick={handleFetchUser} disabled={loading}>
          Fetch user
        </Button>
      </header>
      <ul className="grid grid-cols-posts justify-between gap-5">
        {items.map((item, index) => (
          <li
            className="w-[220px] h-[300px] relative border border-white p-2 rounded-xl bg-sky-400"
            key={index}
          >
            {item.id}
            <Button
              className="absolute top-2 right-2"
              onClick={() => handleDeleteItem(item)}
            >
              <TiDelete size={22} />
            </Button>
          </li>
        ))}
        <li className="flex items-center justify-center w-[220px] h-[300px] border border-white p-2 rounded-xl bg-neutral-400">
          <Button
            className="p-4"
            onClick={() =>
              handleAddItem({ id: Math.round(Math.random() * 999) })
            }
          >
            <IoIosAddCircleOutline color="white" size={50} />
          </Button>
        </li>
      </ul>

      {isModalOpen && <ChangeNicknameModal setIsOpen={setIsModalOpen} />}
    </section>
  );
};

export default ProfilePage;
