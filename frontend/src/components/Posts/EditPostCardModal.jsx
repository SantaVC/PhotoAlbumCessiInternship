import { useEffect, useState } from "react";
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
import CancelIcon from "@mui/icons-material/Cancel";
import useSelectPosts from "../../hooks/useSelectPosts";
import { deletePost, updatePost } from "../../redux/thunks/postsThunks";
import { BASE_URL, postValidationSchema } from "../../constants";
import PostDescriptionInput from "./PostDescriptionInput";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  p: 4,
};

const EditPostCardModal = ({ item, open, handleClose }) => {
  const [value, setValue] = useState(item?.description);
  const { isLoading } = useSelectPosts();

  useEffect(() => {
    setValue(item?.description);
  }, [item?.description]);

  const methods = useForm({ resolver: zodResolver(postValidationSchema) });
  const {
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const updatedItem = { ...item, ...data };

    try {
      await dispatch(updatePost(updatedItem));

      handleClose();
    } catch (error) {
      console.log(error);
      setError("root", { message: error.message });
    }
  };

  const handleDeleteItem = async (item) => {
    try {
      await dispatch(deletePost(item)).unwrap();

      handleClose();
    } catch (error) {
      console.log(error);
      setError("root", { message: error.message });
    }
  };

  const disabled = isLoading || value === item?.description;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="editPost-modal-title"
      aria-describedby="editPost-modal-description"
      disableAutoFocus
    >
      <Paper elevation={3} sx={style}>
        <Typography id="editPost-modal-title" variant="h5" component="h2">
          Edit post
        </Typography>

        <Box
          component={"form"}
          id="editCardForm"
          onSubmit={handleSubmit(onSubmit)}
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
                id={"postDescription-edit"}
              />

              {isLoading && <CircularProgress sx={{ alignSelf: "center" }} />}

              {errors.root && (
                <Typography variant="body1" component="p" color="error">
                  {errors.root.message}
                </Typography>
              )}

              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={3}
              >
                <Button
                  disabled={isLoading}
                  onClick={() => handleDeleteItem(item)}
                  size="small"
                  color="error"
                  variant="contained"
                >
                  Delete post
                </Button>

                <Button
                  disabled={disabled}
                  size="large"
                  sx={{ alignSelf: "flex-end" }}
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
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

export default EditPostCardModal;
