import { useState } from "react";
import { IconButton, Paper } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreatePostItemModal from "./CreatePostItemModal";

const CreatePostItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          width: 220,
          height: 300,
          position: "relative",
        }}
      >
        <IconButton sx={{ p: 2 }} onClick={handleOpen}>
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Paper>

      <CreatePostItemModal open={isOpen} handleClose={handleClose} />
    </>
  );
};

export default CreatePostItem;
