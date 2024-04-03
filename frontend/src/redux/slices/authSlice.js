import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userAuth: {
      user: null,
      token: null,
    },
    canVerify: false,
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.userAuth.user = action.payload;
    },
    setToken: (state, action) => {
      state.userAuth.token = action.payload;
    },
    resetAuth: (state) => {
      state.userAuth.user = null;
      state.userAuth.token = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setToken, setLoading, resetAuth, setUser } = authSlice.actions;

export const selectAuth = (state) => state.auth.userAuth;
export const selectLoading = (state) => state.auth.loading;

export default authSlice.reducer;
