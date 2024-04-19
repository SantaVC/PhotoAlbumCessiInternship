import { Box } from "@mui/material";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const style = {
  flexShrink: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 128,
  height: 128,
  border: "2px solid",
  borderRadius: "50%",
  overflow: "hidden",
};

const UserAvatar = () => {
  const [url, setUrl] = useState();

  const handleUpload = (event) => {
    const blob = new Blob([event.target.files[0]], { type: "profilePicture" });

    if (blob?.size < 10) {
      return;
    }

    setUrl(URL.createObjectURL(blob));
  };

  return (
    <Box flexShrink={0} sx={{ ...style }}>
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
