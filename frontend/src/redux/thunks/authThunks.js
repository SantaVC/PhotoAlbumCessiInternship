import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser, setLoading, setError } from "../slices/authSlice";
import authService, {
  removeAuthToken,
  removeLocalUser,
  setAuthToken,
  setLocalUser,
} from "../../services/authService";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const { user, token } = await authService.register(userData);

      setAuthToken(token);
      setLocalUser(user);

      dispatch(setUser(user));
    } catch (error) {
      console.log(error);

      if (!error.request.status || error.response.status === 500) {
        dispatch(setError(error.message));
        throw error.message;
      }

      removeAuthToken();
      removeLocalUser();
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

      setLocalUser(user);
      setAuthToken(token);

      dispatch(setUser(user));
    } catch (error) {
      console.log(error);

      if (!error.request.status || error.response.status === 500) {
        dispatch(setError(error.message));
        throw error.message;
      }

      removeAuthToken();
      removeLocalUser();
      // error.response.data.errors <- errors object
      dispatch(setError(error.response.data.errors));
      throw error.response.data;
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

      removeAuthToken();
      removeLocalUser();

      dispatch(setUser(null));
    } catch (error) {
      console.log(error);

      if (!error.request.status || error.response.status === 500) {
        dispatch(setError(error.message));
        throw error.message;
      }

      // error.response.data.errors <- errors object
      dispatch(setError(error.response.data.errors));

      throw error.response.data;
    }
  }
);
