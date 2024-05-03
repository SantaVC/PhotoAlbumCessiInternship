import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

const FirstNameInput = ({ profile }) => {
  const [value, setValue] = useState(profile?.first_name);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    setValue(profile?.first_name);
  }, [profile?.first_name]);

  return (
    <TextField
      {...register("first_name")}
      type="text"
      id="first_name"
      onChange={(e) => setValue(e.target.value)}
      fullWidth
      label="First name"
      value={value || ""}
      error={Boolean(errors.first_name)}
      helperText={errors.first_name && errors.first_name.message}
    />
  );
};

export default FirstNameInput;
