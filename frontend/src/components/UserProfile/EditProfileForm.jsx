import { useState } from "react";
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
import useSelectUserAuth from "../../hooks/useSelectUserAuth";

const schema = z
  .object({
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
  })
  .refine((data) => genderVariants.includes(data.gender), {
    message: "kek",
    path: ["gender"],
  });

const EditProfileForm = () => {
  const [gender, setGender] = useState(
    genderVariants[genderVariants.length - 1] || ""
  );

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const dispatch = useDispatch();
  const { user } = useSelectUserAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await dispatch(updateProfile(data)).unwrap();
    } catch (error) {
      console.log("Update profile failed.");
      setError("root", { message: error.message });
    }
  };

  return (
    <Box
      sx={{
        my: 3,
      }}
    >
      <Stack
        direction="column"
        sx={{ width: 1 }}
        gap={2}
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack direction="row" justifyContent="space-between" gap={4}>
          <Stack minWidth={300} direction="column" gap={3}>
            <Box>
              <TextField
                {...register("first_name")}
                fullWidth
                id="first_name"
                label="First name"
                name="first_name"
                autoFocus
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
                  onChange={handleChange}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Gender"
                  value={gender}
                  error={Boolean(errors.gender)}
                >
                  {genderVariants.map((gender, index) => (
                    <MenuItem value={gender} key={index}>
                      {gender}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {errors.gender && (
                <p className="px-1 text-red-500">{errors.gender.message}</p>
              )}
            </Box>
          </Stack>

          <Stack flexGrow={1} direction="column" gap={3}>
            <Box width={1} height={1} bgcolor={"primary.main"}></Box>
          </Stack>
        </Stack>

        {errors.root && (
          <Typography variant="body1" component="p" color="error">
            {errors.root.message}
          </Typography>
        )}

        <Button
          sx={{ maxWidth: 300 }}
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
