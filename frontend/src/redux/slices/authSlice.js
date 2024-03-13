import { createSlice } from "@reduxjs/toolkit";
import { getLocalUser, removeLocalUser } from "../../services/authService";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      const localUser = getLocalUser();

      if (localUser) {
        state.user = JSON.parse(localUser);
      } else {
        state.user = action.payload;
      }

      state.isAuthenticated = !!action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      removeLocalUser();
    },
  },
});

export const { setUser, setLoading, setError } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
