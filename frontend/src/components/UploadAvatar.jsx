import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { changeAvatar } from "../redux/thunks/userThunks";
import { BASE_URL } from "../constants";
import useSelectUserAuth from "../hooks/useSelectUserAuth";

const style = {
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  border: "2px solid",
  borderRadius: "50%",
  overflow: "hidden",
};

const UploadAvatar = ({ width = 200, height = 200 }) => {
  const { profile } = useSelectUserAuth();
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (profile?.avatar) {
      setUrl(`${BASE_URL}/${profile?.avatar}`);
    }
  }, [profile?.avatar]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    console.log(file, image);

    if (!file || file.size === image?.size) {
      return;
    }

    setError("");
    setImage(file);
    setUrl(URL.createObjectURL(file));
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!image) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", image);

    try {
      setError("");
      await dispatch(changeAvatar(formData)).unwrap();
    } catch (error) {
      setError(error.message);
    }

    setImage(null);
  };

  return (
    <Stack
      component="form"
      direction="column"
      alignItems={"center"}
      maxWidth={200}
      gap={2}
    >
      <Box flexShrink={0} sx={{ ...style, width, height }}>
        <Box
          component={"label"}
          htmlFor="userAvatar"
          sx={{
            width: 1,
            height: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <input
            type="file"
            id="userAvatar"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {!url ? (
            <AddCircleIcon fontSize="large" />
          ) : (
            <Box
              component="img"
              src={url}
              sx={{ objectFit: "cover", height: 1 }}
              alt="Profile picture"
            ></Box>
          )}
        </Box>
      </Box>

      {error && (
        <Typography
          textAlign={"center"}
          variant="body1"
          component="p"
          color="error"
        >
          {error}
        </Typography>
      )}

      {image && (
        <Button onClick={handleUpload} type="submit" variant="outlined">
          Upload image
        </Button>
      )}
    </Stack>
  );
};

export default UploadAvatar;
