import { useState } from "react";
import { useSelector } from "react-redux";
import { selectLoading } from "../../redux/slices/authSlice";
import { MdEdit } from "react-icons/md";
import { Button, ChangeNicknameModal, UserInfoListSkeleton } from "../index";
import useUserAuth from "../../hooks/useUserAuth";

const UserInfoList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUserAuth();
  const loading = useSelector(selectLoading);

  return (
    <>
      {loading ? (
        <UserInfoListSkeleton />
      ) : (
        <ul className="flex flex-col h-full gap-1">
          <li className="flex gap-1">
            {user?.nickname}
            <Button onClick={() => setIsModalOpen(true)}>
              <MdEdit size={24} />
            </Button>
          </li>
          <li>Игорь молодец</li>
          <li>#test #test</li>
          <li className="mt-2 text-lg">123 publications</li>
        </ul>
      )}

      {isModalOpen && <ChangeNicknameModal setIsOpen={setIsModalOpen} />}
    </>
  );
};

export default UserInfoList;
