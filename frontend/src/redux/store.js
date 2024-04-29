import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import modalsSlice from "./slices/modalsSlice";
import postsSlice from "./slices/postsSlice";

const store = configureStore({
  reducer: { auth: authSlice, modals: modalsSlice, posts: postsSlice },
});

export default store;
