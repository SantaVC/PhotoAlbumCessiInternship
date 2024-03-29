import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  resetAuth,
  setAuth,
  setCanVerify,
  setLoading,
  setToken,
} from "../slices/authSlice";
import authService from "../../services/authService";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      // dispatch(setCanVerify(false));

      const response = await authService.register(userData);

      dispatch(setAuth(response));
      // dispatch(setCanVerify(true));
    } catch (error) {
      console.log(error);
      // dispatch(setCanVerify(false));

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

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (userData, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await authService.resetPassword(userData);
      console.log(response);
    } catch (error) {
      console.log(error);

      throw new Error("Internal server error.");
    } finally {
      dispatch(setLoading(false));
    }
  }
);
