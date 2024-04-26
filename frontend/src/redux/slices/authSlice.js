import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userAuth: {
      user: null,
      profile: null,
      token: null,
    },
    canVerify: false,
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      const { user, profile } = action.payload;
      state.userAuth.user = user;
      state.userAuth.profile = profile;
    },
    setProfile: (state, action) => {
      state.userAuth.profile = action.payload;
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
    updateAvatar: (state, action) => {
      state.userAuth.profile.avatar = action.payload;
    },
  },
});

export const {
  setToken,
  setLoading,
  resetAuth,
  setUser,
  updateNickname,
  updateAvatar,
  setProfile,
} = authSlice.actions;

export default authSlice.reducer;
