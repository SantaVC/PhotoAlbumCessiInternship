import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading } from "../redux/slices/authSlice";
import { getUser } from "../redux/thunks/authThunks";
import {
  Button,
  ChangePasswordModal,
  UserAvatar,
  UserInfoList,
  UserPosts,
} from "../components";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const handleFetchUser = () => {
    dispatch(getUser());
  };

  return (
    <section className="dark:text-white p-5 bg-sky-200 dark:bg-neutral-800 rounded-3xl">
      <header className="flex items-start gap-5 mb-8 rounded-3xl p-4">
        <UserAvatar />

        <UserInfoList />

        <Button primary disabled={loading} onClick={handleFetchUser}>
          Fetch user
        </Button>
        <Button primary disabled={loading} onClick={() => setIsModalOpen(true)}>
          Change password
        </Button>
      </header>

      <UserPosts />
      {isModalOpen && <ChangePasswordModal setIsOpen={setIsModalOpen} />}
    </section>
  );
};

export default ProfilePage;
