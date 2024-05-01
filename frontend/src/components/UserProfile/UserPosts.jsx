import { useEffect, useState } from "react";
import { PostCard, PostCardModal } from "../index";
import { Box } from "@mui/material";
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
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const { items } = useSelectPosts();
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

  // if (isLoading) {
  //   return (
  //     <List sx={{ ...style }}>
  //       {[...Array(3)].map((_, index) => (
  //         <li key={index}>
  //           <UserPostSkeleton speed={0.75} />
  //         </li>
  //       ))}
  //     </List>
  //   );
  // }

  return (
    <Box component={"ul"} sx={{ ...style }}>
      {items.map((item) => (
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

      <PostCardModal
        item={currentItem}
        open={isOpen}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default UserPosts;
