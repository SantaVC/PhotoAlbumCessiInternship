import { useDispatch } from "react-redux";
import { Box, Button, Card, CardContent, CardMedia } from "@mui/material";
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
    <Card
      elevation={0}
      sx={{ width: 220, height: 300, position: "relative", borderRadius: 5 }}
      component="li"
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, height: 1 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <CardMedia
            sx={{ height: 120, width: 130, backgroundSize: "contain" }}
            image={`${BASE_URL}/${item.image_path}`}
          />

          <Button
            className="absolute top-2 right-2"
            onClick={() => handleDeleteItem(item)}
          >
            <DeleteIcon />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
