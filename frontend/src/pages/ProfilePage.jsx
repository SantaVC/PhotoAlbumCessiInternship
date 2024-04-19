import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { selectLoading } from "../redux/slices/authSlice";
import { getUser } from "../redux/thunks/authThunks";
import { Stack, Button, Link } from "@mui/material";
import {
  UserAvatar,
  UserInfoList,
  UserPosts,
  Section,
  SectionHeading,
} from "../components";

const ProfilePage = () => {
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const handleFetchUser = () => {
    dispatch(getUser());
  };

  return (
    <Section>
      <SectionHeading>ProfilePage</SectionHeading>

      <Stack direction="row" alignItems="flex-start" gap={3} my={4}>
        <UserAvatar />

        <UserInfoList />

        <Button
          variant="contained"
          disabled={loading}
          onClick={handleFetchUser}
        >
          Fetch user
        </Button>

        <Link component={RouterLink} to="/profile/edit">
          Edit profile
        </Link>
      </Stack>
      <UserPosts />
    </Section>
  );
};

export default ProfilePage;
