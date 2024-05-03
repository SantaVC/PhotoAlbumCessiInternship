import { useDispatch } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { nameRegex } from "../../constants";
import { Box, Stack, Button, Typography } from "@mui/material";
import { updateProfile } from "../../redux/thunks/userThunks";
import FirstNameInput from "./FirstNameInput";
import LastNameInput from "./LastNameInput";
import SelectGender from "./SelectGender";

const schema = z.object({
  first_name: z
    .string()
    .regex(nameRegex, "First name must contain only english letters.")
    .max(255, "First name is too long")
    .optional()
    .or(z.literal("")),
  last_name: z
    .string()
    .max(255, "Last name is too long")
    .regex(nameRegex, "Last name must contain only english letters.")
    .optional()
    .or(z.literal("")),
  gender: z.string().optional(),
});

const EditProfileForm = ({ profile }) => {
  const dispatch = useDispatch();

  const methods = useForm({ resolver: zodResolver(schema) });
  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await dispatch(updateProfile(data)).unwrap();
    } catch (error) {
      console.log("Update profile failed.");
      setError("root", { message: error.message });
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        display="flex"
        flexDirection="column"
        sx={{ width: 1 }}
        gap={2}
      >
        <Stack direction="column" gap={3}>
          <FirstNameInput profile={profile} />
          <LastNameInput profile={profile} />
          <SelectGender profile={profile} />
        </Stack>

        {errors.root && (
          <Typography variant="body1" component="p" color="error">
            {errors.root.message}
          </Typography>
        )}

        <Button
          sx={{ maxWidth: 300, alignSelf: "flex-end" }}
          variant="contained"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Update Profile"}
        </Button>
      </Box>
    </FormProvider>
  );
};

export default EditProfileForm;
