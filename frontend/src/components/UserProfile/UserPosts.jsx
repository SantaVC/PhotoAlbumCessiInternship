import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, List } from "@mui/material";
import { getPosts } from "../../redux/thunks/postsThunks";
import useSelectPosts from "../../hooks/useSelectPosts";
import CreatePostItem from "../Posts/CreatePostItem";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { PostCard, EditPostCardModal, UserPostSkeleton } from "../index";

const style = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 220px)",
  justifyContent: "space-around",
  gap: 3,
};

const UserPosts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

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

  if (!items && isLoading) {
    return (
      <List sx={{ ...style }}>
        {[...Array(3)].map((_, index) => (
          <li key={index}>
            <UserPostSkeleton speed={0.75} />
          </li>
        ))}
      </List>
    );
  }

  return (
    <Box component={"ul"} sx={{ ...style }}>
      {items?.map((item) => (
        <PostCard
          key={item.id}
          item={item}
          handleOpen={handleOpen}
          setCurrentItem={setCurrentItem}
        />
      ))}

      <Box component={"li"}>
        <CreatePostItem />
      </Box>

      <EditPostCardModal
        item={currentItem}
        open={isOpen}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default UserPosts;
