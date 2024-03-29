import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: { auth: authSlice },

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       // Ignore these action types
  //       ignoredActions: [
  //         "user/userRegister/fulfilled",
  //         "user/userLogin/fulfilled",
  //       ],
  //       // Ignore these field paths in all actions
  //       ignoredActionPaths: ["meta.arg", "payload.timestamp"],
  //       // Ignore these paths in the state
  //       ignoredPaths: ["user.dates"],
  //     },
  //   }),
});

export default store;
