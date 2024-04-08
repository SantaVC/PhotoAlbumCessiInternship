import { createPortal } from "react-dom";

const Modal = ({ children, ...rest }) => {
  return createPortal(
    <>
      <div {...rest} className="fixed inset-0 bg-neutral-400 opacity-50"></div>
      {children}
    </>,
    document.getElementById("modals")
  );
};

export default Modal;
