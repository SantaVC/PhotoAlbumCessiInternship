import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { List, ListItem, IconButton } from "@mui/material";
import { ChangeNicknameModal, UserInfoListSkeleton } from "../index";
import useSelectUserAuth from "../../hooks/useSelectUserAuth";
import useSelectLoading from "../../hooks/useSelectLoading";

const UserInfoList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const { user } = useSelectUserAuth();
  const loading = useSelectLoading();

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
