import { useDispatch } from "react-redux";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { BASE_URL } from "../../constants";
import { deletePost } from "../../redux/thunks/postsThunks";

const PostCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleDeleteItem = async (item) => {
    try {
      await dispatch(deletePost(item)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        width: 220,
        height: 300,
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
      }}
      component="li"
    >
      <Box height={1}>
        <img
          style={{ height: "100%", objectFit: "cover" }}
          src={`${BASE_URL}/${item.id}/${item.image_path}`}
        />

        <IconButton
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={() => handleDeleteItem(item)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PostCard;
