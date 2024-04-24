import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { resetAuth } from "../redux/slices/authSlice";
import { getUser } from "../redux/thunks/authThunks";
import { Stack, Button, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  UserAvatar,
  UserInfoList,
  UserPosts,
  Section,
  SectionHeading,
} from "../components";
import useSelectUserAuth from "../hooks/useSelectUserAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useSelectLoading from "../hooks/useSelectLoading";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const loading = useSelectLoading();
  const { user } = useSelectUserAuth();

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        console.log("fetching user");
        isMounted && (await dispatch(getUser()).unwrap());
      } catch (error) {
        console.log(error);
        dispatch(resetAuth());
      } finally {
        console.log("finished fetching user");
      }
    };

    if (!user) {
      fetchProfile();
    }

    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, dispatch, user]);

  const handleFetchUser = async () => {
    await dispatch(getUser()).unwrap();
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

        <IconButton component={RouterLink} to="/profile/edit">
          <SettingsIcon />
        </IconButton>
      </Stack>
      <UserPosts />
    </Section>
  );
};

export default ProfilePage;
