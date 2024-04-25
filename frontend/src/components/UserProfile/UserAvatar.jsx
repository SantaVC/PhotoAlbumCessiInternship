import { Box } from "@mui/material";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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

const UserAvatar = ({ width = 128, height = 128 }) => {
  const [url, setUrl] = useState();

  const handleUpload = (event) => {
    const file = new File([event.target.files[0]], "avatar", {
      type: "image/png",
    });
    console.log(file);
    if (file?.size < 10) {
      return;
    }

    setUrl(URL.createObjectURL(file));
  };

  return (
    <Box component="form" flexShrink={0} sx={{ ...style, width, height }}>
      <label
        className="w-full h-full flex items-center justify-center cursor-pointer"
        htmlFor="userAvatar"
      >
        <input
          type="file"
          id="userAvatar"
          onChange={handleUpload}
          className="hidden"
        />

        {!url ? (
          <AddCircleIcon fontSize="large" />
        ) : (
          <img
            src={url}
            className="object-cover h-full"
            alt="Profile picture"
          />
        )}
      </label>
    </Box>
  );
};

export default UserAvatar;
