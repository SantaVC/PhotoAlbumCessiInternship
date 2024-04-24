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
    updateNickname: (state, action) => {
      state.userAuth.user.nickname = action.payload;
    },
  },
});

export const { setToken, setLoading, resetAuth, setUser, updateNickname } =
  authSlice.actions;

export default authSlice.reducer;
