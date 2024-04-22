import { createPortal } from "react-dom";

const Modal = ({ children, ...rest }) => {
  return createPortal(
    <>
      <div {...rest} className="fixed inset-0 bg-[rgba(0,0,0,0.4)]"></div>
      {children}
    </>,
    document.getElementById("modals")
  );
};

export default Modal;
