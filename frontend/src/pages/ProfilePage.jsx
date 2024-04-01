import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading } from "react-icons/ai";
import { selectLoading } from "../redux/slices/authSlice";
import { getUser } from "../redux/thunks/authThunks";
import { Button } from "../components";
import useUserAuth from "../hooks/useUserAuth";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const { user } = useUserAuth();

  const handleClick = () => {
    dispatch(getUser());
  };

  return (
    <section>
      <p>ProfilePage</p>
      <p>Игорь молодец</p>

      <div className="my-3">
        {loading ? (
          <AiOutlineLoading size={28} className="animate-spin" />
        ) : (
          <>
            <p>nickname: {user?.nickname}</p>
            <p>email: {user?.email}</p>
          </>
        )}
      </div>

      <Button
        onClick={handleClick}
        disabled={loading}
        className="py-2 px-3 rounded bg-sky-500 disabled:cursor-not-allowed disabled:bg-neutral-400 text-white"
      >
        Fetch user
      </Button>
    </section>
  );
};

export default ProfilePage;
