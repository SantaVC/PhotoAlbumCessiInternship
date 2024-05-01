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
import useSelectPosts from "../../hooks/useSelectPosts";
import { deletePost, updatePost } from "../../redux/thunks/postsThunks";
import { BASE_URL } from "../../constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  p: 4,
};

const PostCardModal = ({ item, open, handleClose }) => {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const { isLoading } = useSelectPosts();

  const helperText = value.length;

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const updatedItem = { ...item, description: formData.get("description") };

    try {
      setError("");

      await dispatch(updatePost(updatedItem));

      setError("");
      setValue("");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = async (item) => {
    try {
      setError("");

      await dispatch(deletePost(item)).unwrap();

      setError("");
      setValue("");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const formData = new FormData();
  //   formData.append("image", image);
  //   formData.append("description", value);

  //   try {
  //     setError("");

  //     await dispatch(createPost(formData)).unwrap();

  //     setError("");
  //     handleClose();
  //   } catch (error) {
  //     console.log(error);
  //     setError(error.message);
  //   }
  // };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="editPost-modal-title"
      aria-describedby="editPost-modal-description"
    >
      <Paper elevation={3} sx={style}>
        <Typography id="editPost-modal-title" variant="h5" component="h2">
          Edit post
        </Typography>

        <Box
          component={"form"}
          id="editCardForm"
          onSubmit={handleSubmit}
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
            <img
              style={{ height: "100%", objectFit: "cover" }}
              src={`${BASE_URL}/${item?.id}/${item?.image_path}`}
              alt="Post picture"
            />
          </Box>

          <Box
            flexGrow={1}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <TextField
              fullWidth
              placeholder="Description..."
              label="Description"
              multiline
              name="description"
              defaultValue={item?.description}
              helperText={item?.description?.length || ""}
              FormHelperTextProps={{ sx: { textAlign: "right" } }}
              minRows={4}
              maxRows={10}
            />

            {isLoading && <CircularProgress />}

            {error && (
              <Typography variant="body1" component="p" color="error">
                {error}
              </Typography>
            )}

            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={3}
            >
              <Button
                onClick={() => handleDeleteItem(item)}
                disabled={isLoading}
                size="small"
                color="error"
                variant="contained"
              >
                Delete post
              </Button>

              <Button
                disabled={isLoading}
                size="large"
                sx={{ alignSelf: "flex-end" }}
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </Box>
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

export default PostCardModal;
