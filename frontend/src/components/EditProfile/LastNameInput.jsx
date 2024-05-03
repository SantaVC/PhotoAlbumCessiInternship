import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

const LastNameInput = ({ profile }) => {
  const [value, setValue] = useState(profile?.last_name);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    setValue(profile?.last_name);
  }, [profile?.last_name]);

  return (
    <TextField
      {...register("last_name")}
      type="text"
      id="last_name"
      onChange={(e) => setValue(e.target.value)}
      fullWidth
      label="First name"
      value={value || ""}
      error={Boolean(errors.last_name)}
      helperText={errors.last_name && errors.last_name.message}
    />
  );
};

export default LastNameInput;
