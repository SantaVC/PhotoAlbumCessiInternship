import "../../scss/LoginModal.scss";
import { Link, Navigate } from "react-router-dom";
import { CgCloseR } from "react-icons/cg";
import { Button, Modal, SignInForm } from "../index";
import useUserAuth from "../../hooks/useUserAuth";

const SignInModal = () => {
  const { token } = useUserAuth();

  if (token) {
    return <Navigate to={"/"} />;
  }

  return (
    <Modal>
      <div className="signInModal fixed top-1/2 left-1/2 max-w-96 bg-white rounded-xl onModalOpen">
        <div className="signInModal__content relative flex flex-col gap-5 justify-center items-center h-full p-6">
          <h2 className="text-center text-3xl f-regular">Sign in</h2>

          <SignInForm />

          <Button className="self-end text-sm underline underline-offset-2 decoration-sky-300">
            Forgot password?
          </Button>

          <div className="self-end">
            <span>Don't have an account? </span>
            <Link
              to={"/signup"}
              className="underline underline-offset-2 decoration-sky-300"
            >
              Sign up
            </Link>
          </div>

          <Link
            to={"/"}
            className="absolute top-[-32px] right-[-32px] p-1 opacity-60 hover:opacity-100 hover:rotate-90 transition-[transform] duration-300"
          >
            <CgCloseR size={30} />
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default SignInModal;
