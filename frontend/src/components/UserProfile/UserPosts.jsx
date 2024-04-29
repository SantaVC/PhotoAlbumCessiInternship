import { useEffect } from "react";
import { PostCard, UserPostSkeleton } from "../index";
import { Box, List, ListItem } from "@mui/material";
import useSelectPosts from "../../hooks/useSelectPosts";
import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/thunks/postsThunks";
import CreatePostItem from "../Posts/CreatePostItem";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const style = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 220px)",
  justifyContent: "space-around",
  gap: 3,
};

const UserPosts = () => {
  const { items, isLoading } = useSelectPosts();

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await dispatch(getPosts());
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [dispatch, axiosPrivate]);

  if (isLoading) {
    return (
      <List sx={{ ...style }}>
        {[...Array(5)].map((_, index) => (
          <li key={index}>
            <UserPostSkeleton speed={0.75} />
          </li>
        ))}
      </List>
    );
  }

  return (
    <Box component={"ul"} sx={{ ...style }}>
      {items.map((item) => (
        <PostCard key={item.id} item={item} />
      ))}

      <ListItem disablePadding>
        <CreatePostItem />
      </ListItem>
    </Box>
  );
};

export default UserPosts;
