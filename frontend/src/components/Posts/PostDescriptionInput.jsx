import { useFormContext } from "react-hook-form";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";

const PostDescriptionInput = ({
  value,
  setValue,
  id,
  name = "description",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasErrors = Boolean(errors.description);

  return (
    <FormControl error={hasErrors} variant="outlined" fullWidth>
      <Box position={"relative"}>
        <OutlinedInput
          inputProps={{ ...register(name) }}
          id={id}
          label="Description"
          fullWidth
          multiline
          minRows={4}
          maxRows={10}
          onChange={(e) => setValue(e.target.value)}
          value={value || ""}
        />
        <Typography
          position={"absolute"}
          bottom={6}
          right={6}
          fontSize={12}
          component={"span"}
        >
          {value?.length}
        </Typography>
      </Box>
      <InputLabel htmlFor={id}>Description</InputLabel>
      <FormHelperText error={hasErrors}>
        {errors?.description?.message}
      </FormHelperText>
    </FormControl>
  );
};

export default PostDescriptionInput;
