import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetAuth, setLoading, setToken, setUser } from "../slices/authSlice";
import authService from "../../services/authService";

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const data = await authService.getUser();

      dispatch(setUser(data));

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error.");
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const { user } = await authService.register(userData);

      dispatch(setUser(user));
    } catch (error) {
      console.log(error);

      if (error?.request?.status === 422) {
        throw new Error("This user already exists.");
      }

      throw new Error("Internal server error.");
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

      const { token } = await authService.login(userData);

      dispatch(setToken(token));
    } catch (error) {
      console.log(error);

      if (error?.response?.status === 422) {
        throw new Error("Wrong email or password.");
      }

      throw new Error("Internal server error.");
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

      await authService.logout();
      console.log("Logout success");

      dispatch(resetAuth());
    } catch (error) {
      console.log(error);

      throw new Error("Logout failed...");
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const resendVerification = createAsyncThunk(
  "auth/resendVerification",
  async (userData, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await authService.resendVerification(userData);
      console.log(response);
    } catch (error) {
      console.log(error);

      throw new Error("Internal server error.");
    } finally {
      dispatch(setLoading(false));
    }
  }
);
