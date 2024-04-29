import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { createPost } from "../../redux/thunks/postsThunks";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  p: 4,
};

const CreatePostItem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [value, setValue] = useState("");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file || file.size === image?.size) {
      return;
    }

    setError("");
    setImage(file);
    setUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", value);

    try {
      await dispatch(createPost(formData)).unwrap();

      setImage(null);
      setValue("");
      // setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

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

      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="createPost-modal-title"
        aria-describedby="createPost-modal-description"
      >
        <Paper elevation={3} sx={style}>
          <Typography id="createPost-modal-title" variant="h5" component="h2">
            Create post
          </Typography>

          <Box
            onSubmit={handleSubmit}
            component={"form"}
            display={"flex"}
            justifyContent={"space-between"}
            gap={3}
            width={1}
            mt={2}
          >
            <Box
              borderRadius={"10px"}
              overflow={"hidden"}
              flexShrink={0}
              width={300}
              height={400}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Box
                component={"label"}
                htmlFor="createPost"
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <input
                  type="file"
                  id="createPost"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />

                {!url ? (
                  <AddCircleIcon sx={{ fontSize: "100px" }} />
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

            <Box
              flexGrow={1}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
            >
              <TextField
                onChange={(e) => setValue(e.target.value)}
                value={value}
                fullWidth
                placeholder="Description..."
                id="outlined-multiline-static"
                label="Description"
                multiline
                minRows={4}
                maxRows={10}
              />

              <Button
                size="large"
                sx={{ alignSelf: "flex-end" }}
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default CreatePostItem;
