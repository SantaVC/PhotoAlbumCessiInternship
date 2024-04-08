import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading } from "react-icons/ai";
import { CgCloseR } from "react-icons/cg";
import { Modal, Button } from "../index";
import { changeNickname } from "../../redux/thunks/userThunks";
import { selectLoading } from "../../redux/slices/authSlice";
import { nicknameRegex } from "../../constants";
import useUserAuth from "../../hooks/useUserAuth";

const ChangeNicknameModal = ({ setIsOpen }) => {
  const { user } = useUserAuth();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const [error, setError] = useState("");
  const nickname = useRef(null);

  useEffect(() => {
    nickname.current = user?.nickname;
  }, [user?.nickname]);

  useEffect(() => {
    const BODY = document.body;

    BODY.style.paddingRight =
      window.innerWidth - document.getElementById("root").offsetWidth + "px";
    BODY.classList.add("overflow-hidden");

    return () => {
      BODY.style.paddingRight = 0 + "px";
      BODY.classList.remove("overflow-hidden");
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (nickname.current === user?.nickname) {
      setError("Enter new nickname.");
      return;
    }

    if (!nicknameRegex.test(nickname.current)) {
      setError(
        "Usernames must only contain alphanumeric characters (minimum 4 characters)."
      );
      return;
    }

    try {
      await dispatch(changeNickname({ nickname: nickname.current })).unwrap();

      setIsOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditNickname = (event) => {
    nickname.current = event.target.value;
  };

  return (
    <Modal onClick={() => setIsOpen(false)}>
      <div className="fixed top-1/2 left-1/2 max-w-96 bg-white rounded-xl onModalOpen">
        <div className="relative flex flex-col gap-3 justify-center items-center h-full p-6">
          <h2 className="text-center text-2xl f-regular">Change Username</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus,
            dolorum consequatur libero optio ratione consequuntur.
          </p>
          <form className="w-full f-regular">
            <div className="relative">
              <input
                onChange={handleEditNickname}
                placeholder="New Nickname"
                className="w-full bg-transparent border border-neutral-500 rounded-full px-3 py-1"
                type="text"
              />
              {loading && (
                <div className="absolute top-1/2 translate-y-[-50%] right-3">
                  <AiOutlineLoading
                    size={20}
                    className="animate-spin text-black"
                  />
                </div>
              )}
            </div>

            {error && <p className="mt-2 pl-2 text-red-500">{error}</p>}

            <div className="flex items-center justify-center gap-5 mt-8">
              <Button
                primary
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button primary onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>

          <Button
            className="absolute top-[-32px] right-[-32px] p-1 opacity-60 hover:opacity-100 hover:rotate-90 transition-[transform] duration-300"
            onClick={() => setIsOpen(false)}
          >
            <CgCloseR size={30} />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeNicknameModal;
