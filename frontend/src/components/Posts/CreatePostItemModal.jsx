import { useState } from "react";
import { useDispatch } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import { createPost } from "../../redux/thunks/postsThunks";
import useSelectPosts from "../../hooks/useSelectPosts";
import PostDescriptionInput from "./PostDescriptionInput";
import { postValidationSchema } from "../../constants";

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
  const [imageError, setImageError] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const methods = useForm({ resolver: zodResolver(postValidationSchema) });
  const { handleSubmit } = methods;

  const { isLoading } = useSelectPosts();

  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setIsHovered(false);
    setImageError("");
    setImage(file);
    setUrl(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("description", data.description);

    try {
      setImageError("");

      await dispatch(createPost(formData));

      setUrl(null);
      setImage(null);
      setValue("");
      setIsHovered(false);
      setImageError("");
      handleClose();
    } catch (error) {
      console.log(error);
      setImageError(error.message);
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
          onSubmit={handleSubmit(onSubmit)}
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
                  />
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
                        Choose image
                      </Typography>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Box>

          <FormProvider {...methods}>
            <Box
              flexGrow={1}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
            >
              <PostDescriptionInput
                value={value}
                setValue={setValue}
                id={"postDescription"}
              />

              {isLoading && <CircularProgress sx={{ alignSelf: "center" }} />}

              {imageError && (
                <Typography variant="body1" component="p" color="error">
                  {imageError}
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
          </FormProvider>
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
