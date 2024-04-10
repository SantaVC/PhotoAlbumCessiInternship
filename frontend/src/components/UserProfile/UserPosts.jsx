import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { Button, UserPostSkeleton } from "../index";

const cards = [
  {
    id: 0,
  },
  {
    id: 1,
  },
];

const UserPosts = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        await new Promise((res) => setTimeout(res, 2000));
        setItems(cards);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleAddItem = (item) => {
    setItems((current) => [item, ...current]);
  };

  const handleDeleteItem = (item) => {
    setItems((current) => current.filter((card) => card.id !== item.id));
  };

  if (isLoading) {
    return (
      <ul className="grid grid-cols-posts justify-between gap-5">
        {[...Array(5)].map((_, index) => (
          <li key={index}>
            <UserPostSkeleton speed={0.75} />
          </li>
        ))}
      </ul>
    );
  }

  return (
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
          onClick={() => handleAddItem({ id: Math.round(Math.random() * 999) })}
        >
          <IoIosAddCircleOutline color="white" size={50} />
        </Button>
      </li>
    </ul>
  );
};

export default UserPosts;
