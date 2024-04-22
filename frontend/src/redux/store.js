import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import modalsSlice from "./slices/modalsSlice";

const store = configureStore({
  reducer: { auth: authSlice, modals: modalsSlice },
});

export default store;
