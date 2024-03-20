import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userAuth: {
      user: null,
      token: null,
    },
    persist: JSON.parse(localStorage.getItem("persist")) || false,
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
    resetAuth: (state, action) => {
      state.userAuth.user = null;
      state.userAuth.token = null;
      state.persist = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPersist: (state, action) => {
      state.persist = action.payload;
    },
  },
});

export const { setAuth, setToken, setLoading, resetAuth, setUser, setPersist } =
  authSlice.actions;

export const selectAuth = (state) => state.auth.userAuth;
export const selectLoading = (state) => state.auth.loading;
export const selectPersist = (state) => state.auth.persist;

export default authSlice.reducer;
