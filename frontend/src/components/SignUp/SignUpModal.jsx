import "../../scss/LoginModal.scss";
import { Link, Navigate } from "react-router-dom";
import { CgCloseR } from "react-icons/cg";
import Modal from "../ui/Modal";
import SignUpForm from "./SignUpForm";
import useUserAuth from "../../hooks/useUserAuth";

const SignUpModal = () => {
  const { token } = useUserAuth();

  return token ? (
    <Navigate to={"/"} />
  ) : (
    <Modal>
      <div className="SignInModal fixed top-1/2 left-1/2 max-w-96 bg-white rounded-xl onModalOpen">
        <div className="SignInModal__content relative flex flex-col gap-5 justify-center items-center h-full p-6">
          <h2 className="text-center text-3xl f-regular">Sign up</h2>

          <SignUpForm />

          <div className="self-end">
            <span>Already have an account? </span>
            <Link
              to={"/login"}
              className="underline underline-offset-2 decoration-sky-300"
            >
              Sign in
            </Link>
          </div>

          {token && (
            <Link
              to={"/"}
              className="absolute top-[-32px] right-[-32px] p-1 opacity-60 hover:opacity-100 hover:rotate-90 transition-[transform] duration-300"
            >
              <CgCloseR size={30} />
            </Link>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SignUpModal;
