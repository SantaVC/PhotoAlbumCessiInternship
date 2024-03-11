import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser, setLoading, setError } from "../slices/authSlice";
import authService from "../../services/authService";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const { user, token } = await authService.register(userData);

      window.localStorage.setItem("ACCESS_TOKEN", token);

      dispatch(setUser(user));
    } catch (error) {
      window.localStorage.removeItem("ACCESS_TOKEN");

      // error.response.data.message <- actual error
      dispatch(setError(error.response.data.message));

      throw error.response.data.message;
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const { user, token } = await authService.login(userData);

      window.localStorage.setItem("ACCESS_TOKEN", token);

      dispatch(setUser(user));
    } catch (error) {
      dispatch(setError(error.response.data.message));

      throw error.message;
    }
  }
);
