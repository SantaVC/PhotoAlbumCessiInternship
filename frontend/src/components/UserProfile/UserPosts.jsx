import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TiDelete } from "react-icons/ti";
import { Button, UserPostSkeleton } from "../index";
import { IconButton, List, ListItem, Paper } from "@mui/material";

const cards = [
  {
    id: 0,
  },
  {
    id: 1,
  },
];

const style = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 220px)",
  justifyContent: "space-around",
  gap: 3,
};

const UserPosts = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        await new Promise((res) => setTimeout(res, 2000));
        setItems(cards);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleAddItem = (item) => {
    setItems((current) => [item, ...current]);
  };

  const handleDeleteItem = (item) => {
    setItems((current) => current.filter((card) => card.id !== item.id));
  };

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
    <List sx={{ ...style }}>
      {items.map((item, index) => (
        <ListItem key={index} disablePadding>
          <Paper
            variant="outlined"
            sx={{
              width: 220,
              height: 300,
              position: "relative",
              p: 2,
            }}
          >
            {item.id}
            <Button
              className="absolute top-2 right-2"
              onClick={() => handleDeleteItem(item)}
            >
              <TiDelete size={22} />
            </Button>
          </Paper>
        </ListItem>
      ))}

      <ListItem disablePadding>
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
          <IconButton
            sx={{ p: 2 }}
            onClick={() =>
              handleAddItem({ id: Math.round(Math.random() * 999) })
            }
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Paper>
      </ListItem>
    </List>
  );
};

export default UserPosts;
