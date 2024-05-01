import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import { createPost } from "../../redux/thunks/postsThunks";
import useSelectPosts from "../../hooks/useSelectPosts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  p: 4,
};

const CreatePostItemModal = ({ open, handleClose }) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const { isLoading } = useSelectPosts();

  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setIsHovered(false);
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
      setError("");

      await dispatch(createPost(formData)).unwrap();

      setUrl(null);
      setImage(null);
      setIsHovered(false);
      setError("");
      handleClose();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="createPost-modal-title"
      aria-describedby="createPost-modal-description"
    >
      <Paper elevation={3} sx={style}>
        <Typography id="createPost-modal-title" variant="h5" component="h2">
          Create post
        </Typography>

        <Typography variant="body2" component="h5">
          Maximum image size:{" "}
          <Typography component="span" variant="body2" color="warning.main">
            2MB
          </Typography>
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            borderRadius={"10px"}
            overflow={"hidden"}
            flexShrink={0}
            width={300}
            height={400}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            bgcolor={url ? "transparent" : "grey.300"}
          >
            <Box
              component={"label"}
              htmlFor="createPost"
              sx={{
                position: "relative",
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
                style={{
                  width: "0px",
                  height: "0px",
                  top: "0",
                  position: "absolute",
                  opacity: "0",
                }}
                autoFocus
              />
              {!url ? (
                <Box>
                  <AddCircleIcon sx={{ fontSize: "100px", color: "white" }} />
                  <Typography color={"white"}>Choose image</Typography>
                </Box>
              ) : (
                <>
                  <img
                    src={url}
                    style={{ objectFit: "cover", height: "100%" }}
                    alt="Post picture"
                  ></img>
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
                      }}
                    >
                      <EditIcon sx={{ fontSize: "30px", color: "grey.900" }} />
                      <Typography color={"black"} fontSize={20}>
                        Choose image
                      </Typography>
                    </Box>
                  )}
                </>
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

            {isLoading && <CircularProgress />}

            {error && (
              <Typography variant="body1" component="p" color="error">
                {error}
              </Typography>
            )}

            <Button
              disabled={!url || isLoading}
              size="large"
              sx={{ alignSelf: "flex-end" }}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </Box>

        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: "5px", right: "5px" }}
        >
          <CancelIcon />
        </IconButton>
      </Paper>
    </Modal>
  );
};

export default CreatePostItemModal;
