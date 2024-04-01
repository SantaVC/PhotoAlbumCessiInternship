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
    setAuth: (state, action) => {
      const { user, token } = action.payload;

      state.userAuth.user = user;
      state.userAuth.token = token;
    },
    setUser: (state, action) => {
      state.userAuth.user = action.payload;
    },
    setToken: (state, action) => {
      state.userAuth.token = action.payload;
    },
    resetAuth: (state) => {
      state.userAuth.user = null;
      state.userAuth.token = null;
      state.persist = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setCanVerify: (state, action) => {
      state.canVerify = action.payload;
    },
  },
});

export const {
  setAuth,
  setToken,
  setLoading,
  resetAuth,
  setUser,
  setCanVerify,
} = authSlice.actions;

export const selectAuth = (state) => state.auth.userAuth;
export const selectLoading = (state) => state.auth.loading;
export const selectCanVerify = (state) => state.auth.canVerify;

export default authSlice.reducer;
