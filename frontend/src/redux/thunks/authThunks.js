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
      console.log(error);

      if (!error.request.status || error.response.status === 500) {
        dispatch(setError(error.message));
        throw error.message;
      }

      window.localStorage.removeItem("ACCESS_TOKEN");
      // error.response.data.errors <- errors object
      dispatch(setError(error.response.data.errors));

      throw error.response.data;
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
      console.log(error);

      if (!error.request.status || error.response.status === 500) {
        dispatch(setError(error.message));
        throw error.message;
      }

      window.localStorage.removeItem("ACCESS_TOKEN");
      // error.response.data.errors <- errors object
      dispatch(setError(error.response.data.errors));

      throw error.response.data;
    }
  }
);
