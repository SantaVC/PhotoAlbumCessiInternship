import { useDispatch, useSelector } from "react-redux";
import { selectLoading } from "../redux/slices/authSlice";
import { getUser } from "../redux/thunks/authThunks";
import {
  Button,
  UserAvatar,
  UserInfoList,
  UserPosts,
  Section,
  SectionHeading,
} from "../components";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const handleFetchUser = () => {
    dispatch(getUser());
  };

  return (
    <Section primary>
      <SectionHeading>ProfilePage</SectionHeading>

      <div className="flex items-start gap-5 mb-8 rounded-3xl p-4">
        <UserAvatar />

        <UserInfoList />

        <Button primary disabled={loading} onClick={handleFetchUser}>
          Fetch user
        </Button>

        <Link className="hover:underline p-1" to="/profile/edit">
          Edit profile
        </Link>
      </div>
      <UserPosts />
    </Section>
  );
};

export default ProfilePage;
