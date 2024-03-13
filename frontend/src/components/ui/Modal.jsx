import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  console.log("new modal");
  return createPortal(
    <>
      <div className="fixed inset-0 bg-gray-400 opacity-50"></div>
      {children}
    </>,
    document.getElementById("modals")
  );
};

export default Modal;
