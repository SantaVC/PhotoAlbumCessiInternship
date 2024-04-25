import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { genderVariants, nameRegex } from "../../constants";
import {
  Box,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
} from "@mui/material";
import { updateProfile } from "../../redux/thunks/userThunks";
import { capitalize } from "../../utils";
import useSelectUserAuth from "../../hooks/useSelectUserAuth";
import { UploadAvatar } from "../index";

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

const EditProfileForm = () => {
  const { profile } = useSelectUserAuth();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    setFirstName(profile?.first_name);
    setLastName(profile?.last_name);
    setGender(profile?.gender);
  }, [profile]);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await dispatch(updateProfile(data)).unwrap();
      reset();
    } catch (error) {
      console.log("Update profile failed.");
      setError("root", { message: error.message });
    }
  };

  return (
    <Box
      display={"flex"}
      gap={4}
      sx={{
        my: 3,
      }}
    >
      <UploadAvatar />

      <Stack
        direction="column"
        sx={{ width: 1 }}
        gap={2}
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack direction="column" gap={3}>
          <Box>
            <TextField
              {...register("first_name")}
              fullWidth
              id="first_name"
              label="First name"
              name="first_name"
              defaultValue={firstName}
              error={Boolean(errors.first_name)}
            />

            {errors.first_name && (
              <Typography variant="body1" color="error">
                {errors.first_name.message}
              </Typography>
            )}
          </Box>

          <Box>
            <TextField
              {...register("last_name")}
              fullWidth
              id="last_name"
              label="Last name"
              name="last_name"
              defaultValue={lastName}
              error={Boolean(errors.last_name)}
            />

            {errors.last_name && (
              <Typography variant="body1" color="error">
                {errors.last_name.message}
              </Typography>
            )}
          </Box>

          <Box sx={{ minWidth: 120, maxWidth: 300 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>

              <Select
                {...register("gender")}
                onChange={(event) => setGender(event.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Gender"
                value={capitalize(gender)}
                error={Boolean(errors.gender)}
              >
                {genderVariants.map((gender, index) => {
                  const capitalized = capitalize(gender);

                  return (
                    <MenuItem value={capitalized} key={index}>
                      {capitalized}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {errors.gender && (
              <Typography variant="body1" color="error">
                {errors.gender.message}
              </Typography>
            )}
          </Box>
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
          className="border border-neutral-500 px-5 py-2 f-bold hover:bg-sky-300 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Update Profile"}
        </Button>
      </Stack>
    </Box>
  );
};

export default EditProfileForm;
