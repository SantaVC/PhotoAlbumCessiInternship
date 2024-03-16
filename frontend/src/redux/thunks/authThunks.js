import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetAuth, setAuth, setLoading } from "../slices/authSlice";
import authService from "../../services/authService";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await authService.register(userData);

      dispatch(setAuth(response));
    } catch (error) {
      console.log(error);

      if (!error.request.status || error.response.status === 500) {
        throw error.message;
      }

      throw error.response.data;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await authService.login(userData);

      console.log(response);

      dispatch(setAuth(response));
    } catch (error) {
      console.log(error);

      if (!error.request.status || error.response.status === 500) {
        throw error.message;
      }

      throw error.response.data;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await authService.logout();
      console.log(response);

      dispatch(resetAuth());
    } catch (error) {
      console.log(error);

      if (!error.request.status || error.response.status === 500) {
        throw error.message;
      }

      throw error.response.data;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
