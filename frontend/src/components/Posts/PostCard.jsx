import { useState } from "react";
import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { BASE_URL } from "../../constants";

const PostCard = ({ item, setCurrentItem, handleOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  const onOpen = () => {
    handleOpen();
    setCurrentItem(item);
  };

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
      sx={{
        width: 220,
        height: 300,
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
      }}
      component="li"
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        height={1}
      >
        <img
          loading="lazy"
          style={{ height: "100%", objectFit: "cover" }}
          src={`${BASE_URL}/${item.id}/${item.image_path}`}
          alt="Post picture"
        />
      </Box>
      {isHovered && (
        <Box
          sx={{
            width: "max-content",
            position: "absolute",
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
            display: "flex",
            alignItems: " center",
            justifyContent: "center",
            gap: 1,
            padding: 1,
            bgcolor: "white",
            borderRadius: "10px",
            boxShadow: 10,
          }}
        >
          <EditIcon sx={{ fontSize: "30px", color: "grey.900" }} />
          <Typography color={"black"} fontSize={20}>
            Edit post
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PostCard;
