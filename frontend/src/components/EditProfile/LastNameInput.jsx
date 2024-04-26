import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

const LastNameInput = ({ profile }) => {
  const [lastName, setLastName] = useState(profile?.last_name);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    setLastName(profile?.last_name);
  }, [profile?.last_name]);

  return (
    <TextField
      {...register("last_name")}
      type="text"
      id="last_name"
      onChange={(event) => setLastName(event.target.value)}
      fullWidth
      label="First name"
      value={lastName || ""}
      error={Boolean(errors.last_name)}
      helperText={errors.last_name && errors.last_name.message}
    />
  );
};

export default LastNameInput;
