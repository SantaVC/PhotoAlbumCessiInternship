import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { genderVariants } from "../../constants";
import { capitalize } from "../../utils";

const SelectGender = ({ loading, profile }) => {
  const [gender, setGender] = useState(profile?.gender);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    setGender(profile?.gender);
  }, [profile?.gender]);

  return (
    <Box sx={{ minWidth: 120, maxWidth: 300 }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>

            <Select
              {...register("gender")}
              onChange={(event) => setGender(event.target.value)}
              labelId="demo-simple-select-label"
              id="gender"
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
        </>
      )}
    </Box>
  );
};

export default SelectGender;
