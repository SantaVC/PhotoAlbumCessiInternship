import "../../scss/LoginModal.scss";
import { Link, Navigate } from "react-router-dom";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { Modal, ResetPasswordForm } from "../index";
import useUserAuth from "../../hooks/useUserAuth";

const ResetPasswordModal = () => {
  const { token } = useUserAuth();

  return token ? (
    <Navigate to={"/"} />
  ) : (
    <Modal>
      <div className="fixed top-1/2 left-1/2 max-w-96 bg-white rounded-xl onModalOpen">
        <div className="relative flex flex-col gap-5 justify-center items-center h-full p-6">
          <h2 className="text-center text-3xl f-regular">Reset Password</h2>

          <p className="max-w-[300px] f-regular">
            Provide your email address and we will send you a link to reset your
            password.
          </p>

          <ResetPasswordForm />

          <Link
            to={"/login"}
            className="self-start flex items-center justify-center gap-1 text-sm underline underline-offset-2 decoration-sky-300 f-regular"
          >
            <RxDoubleArrowLeft size={16} />
            Go back to Login
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default ResetPasswordModal;
