import { useDispatch, useSelector } from "react-redux";
import { onClose, onOpen } from "../redux/slices/modalsSlice";

const useSelectModals = () => {
  const dispatch = useDispatch();

  const { isOpen } = useSelector((state) => state.modals);

  const handleClose = () => dispatch(onClose());
  const handleOpen = () => dispatch(onOpen());

  return { isOpen, handleClose, handleOpen };
};

export default useSelectModals;
