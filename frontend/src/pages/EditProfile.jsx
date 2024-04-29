import { Box, Skeleton, Stack } from "@mui/material";
import {
  Section,
  SectionHeading,
  EditProfileForm,
  UploadAvatar,
} from "../components";
import useSelectUserAuth from "../hooks/useSelectUserAuth";
import useSelectLoading from "../hooks/useSelectLoading";

const style = {
  width: 200,
  height: 200,
};

const EditProfile = () => {
  const { profile } = useSelectUserAuth();
  const loading = useSelectLoading();

  return (
    <Section>
      <SectionHeading>EditProfile</SectionHeading>

      <Box
        display={"flex"}
        gap={4}
        sx={{
          my: 3,
        }}
      >
        <UploadAvatar {...style} profile={profile} />

        {loading ? (
          <Stack direction="column" width={1} gap={2}>
            {[...Array(3)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                animation="wave"
                width={"100%"}
                height={50}
              />
            ))}
          </Stack>
        ) : (
          <EditProfileForm profile={profile} />
        )}
      </Box>
    </Section>
  );
};

export default EditProfile;
