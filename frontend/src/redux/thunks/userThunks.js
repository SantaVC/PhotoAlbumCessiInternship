import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading, updateNickname, updateAvatar } from "../slices/authSlice";
import userService from "../../services/userService";

export const changeAvatar = createAsyncThunk(
  "user/changeAvatar",
  async (userData, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      console.log(userData);

      const response = await userService.changeAvatar(userData);

      dispatch(updateAvatar(response.avatar));
      console.log(response);
    } catch (error) {
      console.log(error);

      throw new Error("Internal server error.");
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const changeNickname = createAsyncThunk(
  "user/changeNickname",
  async (userData, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      await userService.changeNickname(userData);

      dispatch(updateNickname(userData.nickname));
    } catch (error) {
      console.log(error);

      if (error?.request?.status === 422) {
        throw new Error("This nickname has already been taken.");
      }

      throw new Error("Internal server error.");
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (userData, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await userService.changePassword(userData);
      console.log(response);
    } catch (error) {
      console.log(error);

      if (error?.request?.status === 422) {
        throw new Error("Invalid credentials.");
      }

      throw new Error("Internal server error.");
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (userData, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await userService.resetPassword(userData);
      console.log(response);
    } catch (error) {
      console.log(error);

      throw new Error("Internal server error.");
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await userService.updateProfile(userData);
      console.log(response);
    } catch (error) {
      console.log(error);

      throw new Error("Internal server error.");
    } finally {
      dispatch(setLoading(false));
    }
  }
);
