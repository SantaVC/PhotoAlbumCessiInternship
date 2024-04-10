import { useEffect } from "react";
import { CgCloseR } from "react-icons/cg";
import { Modal, Button } from "../index";
import ChangePasswordForm from "./ChangePasswordForm";

const ChangePasswordModal = ({ setIsOpen }) => {
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

  return (
    <Modal onClick={() => setIsOpen(false)}>
      <div className="fixed top-1/2 left-1/2 max-w-96 bg-white rounded-xl onModalOpen">
        <div className="relative flex flex-col gap-3 justify-center items-center h-full p-6">
          <h2 className="text-center text-2xl f-regular">Change Password</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus,
            dolorum consequatur libero optio ratione consequuntur.
          </p>

          <ChangePasswordForm setIsOpen={setIsOpen} />

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

export default ChangePasswordModal;
