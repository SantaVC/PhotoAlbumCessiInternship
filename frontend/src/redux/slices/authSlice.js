import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userAuth: {
      user: null,
      token: null,
    },
    loading: false,
  },
  reducers: {
    setAuth: (state, action) => {
      const { user, token } = action.payload;

      state.userAuth.user = user;
      state.userAuth.token = token;
    },
    resetAuth: (state, action) => {
      state.userAuth.user = null;
      state.userAuth.token = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setAuth, setLoading, resetAuth } = authSlice.actions;

export const selectAuth = (state) => state.auth.userAuth;
export const selectLoading = (state) => state.auth.loading;

export default authSlice.reducer;
