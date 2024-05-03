import { List, ListItem } from "@mui/material";
import { UserInfoListSkeleton } from "../index";
import useSelectUserAuth from "../../hooks/useSelectUserAuth";
import useSelectLoading from "../../hooks/useSelectLoading";

const UserInfoList = () => {
  const { user } = useSelectUserAuth();
  const loading = useSelectLoading();

  return (
    <>
      {!user && loading ? (
        <UserInfoListSkeleton />
      ) : (
        <List disablePadding className="flex flex-col h-full gap-1">
          <ListItem disablePadding className="flex gap-1">
            {user?.nickname}
          </ListItem>
          <ListItem disablePadding>Игорь молодец</ListItem>
          <ListItem disablePadding>#test #test</ListItem>
          <ListItem disablePadding sx={{ mt: 1, fontSize: 18 }}>
            123 publications
          </ListItem>
        </List>
      )}
    </>
  );
};

export default UserInfoList;
