import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    isLoading: false,
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      state.items.unshift(action.payload);
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateItem: (state, action) => {
      const updatedItem = action.payload;

      const index = state.items.findIndex((item) => item.id === updatedItem.id);

      if (index !== -1) {
        state.items[index] = {
          ...updatedItem,
        };
      }
    },
  },
});

export const { setItems, addItem, deleteItem, setIsLoading, updateItem } =
  postsSlice.actions;

export default postsSlice.reducer;
