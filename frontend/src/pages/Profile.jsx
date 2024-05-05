import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { getUser } from "../redux/thunks/authThunks";
import { Stack, Button, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  UserInfoList,
  UserPosts,
  Section,
  SectionHeading,
  UploadAvatar,
} from "../components";
import useSelectLoading from "../hooks/useSelectLoading";

const Profile = () => {
  const dispatch = useDispatch();
  const loading = useSelectLoading();

  const handleFetchUser = async () => {
    await dispatch(getUser());
  };

  return (
    <Section>
      <SectionHeading>Profile </SectionHeading>

      <Stack direction="row" alignItems="flex-start" gap={3} my={4}>
        <UploadAvatar width={128} height={128} />

        <UserInfoList />

        <Button
          variant="contained"
          disabled={loading}
          onClick={handleFetchUser}
        >
          Fetch user
        </Button>

        <IconButton component={RouterLink} to="/profile/edit">
          <SettingsIcon />
        </IconButton>
      </Stack>

      <UserPosts />
    </Section>
  );
};

export default Profile;
