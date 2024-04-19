import { useState } from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { List, ListItem, IconButton } from "@mui/material";
import { selectLoading } from "../../redux/slices/authSlice";
import { ChangeNicknameModal, UserInfoListSkeleton } from "../index";
import useUserAuth from "../../hooks/useUserAuth";

const UserInfoList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const { user } = useUserAuth();
  const loading = useSelector(selectLoading);

  return (
    <>
      {loading ? (
        <UserInfoListSkeleton />
      ) : (
        <List disablePadding className="flex flex-col h-full gap-1">
          <ListItem disablePadding className="flex gap-1">
            {user?.nickname}
            <IconButton onClick={handleOpen} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </ListItem>
          <ListItem disablePadding>Игорь молодец</ListItem>
          <ListItem disablePadding>#test #test</ListItem>
          <ListItem disablePadding sx={{ mt: 1, fontSize: 18 }}>
            123 publications
          </ListItem>
        </List>
      )}

      {isModalOpen && (
        <ChangeNicknameModal isOpen={isModalOpen} handleClose={handleClose} />
      )}
    </>
  );
};

export default UserInfoList;
