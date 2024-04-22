import { createSlice } from "@reduxjs/toolkit";

export const modalsSlice = createSlice({
  name: "modals",
  initialState: {
    isOpen: false,
  },
  reducers: {
    onClose: (state, action) => {
      state.isOpen = false;
    },
    onOpen: (state, action) => {
      state.isOpen = true;
    },
  },
});

export const { onClose, onOpen } = modalsSlice.actions;

export default modalsSlice.reducer;
