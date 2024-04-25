import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Stack } from "@mui/material";
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

const UploadAvatar = () => {
  const { profile } = useSelectUserAuth();

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(profile?.avatar || null);

  console.log(url);

  const dispatch = useDispatch();

  useEffect(() => {
    setUrl(profile?.avatar);
  }, [profile?.avatar]);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!image) {
      return;
    }

    console.log(image);
    const formData = new FormData();
    formData.append("avatar", image);

    await dispatch(changeAvatar(formData)).unwrap();
  };

  return (
    <Stack component="form" direction="column" gap={2}>
      <Box flexShrink={0} sx={{ ...style, width: 200, height: 200 }}>
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
              src={`${BASE_URL}/${url}`}
              sx={{ objectFit: "cover", height: 1 }}
              alt="Profile picture"
            ></Box>
          )}
        </Box>
      </Box>

      {image && (
        <Button onClick={handleUpload} type="submit" variant="outlined">
          Upload image
        </Button>
      )}
    </Stack>
  );
};

export default UploadAvatar;
