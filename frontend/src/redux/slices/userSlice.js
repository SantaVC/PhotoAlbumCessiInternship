import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../axios";

export const userRegister = createAsyncThunk(
  "user/userRegister",
  async (data) => {
    try {
      const response = await axiosClient.post("/signup", {
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const userLogin = createAsyncThunk("user/userLogin", async (data) => {
  const response = await axiosClient.post("/login", {
    email: data.email,
    password: data.password,
  });

  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    error: null,
    loading: false,
  },
  // USER REGISTER

  extraReducers(builder) {
    builder.addCase(userRegister.pending, (state) => {
      state.data = null;
      state.error = null;
      state.loading = true;
    });

    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.data = action.data;
      state.error = null;
      state.loading = false;
    });

    builder.addCase(userRegister.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.data = null;
    });

    builder.addCase(userLogin.pending, (state) => {
      state.data = null;
      state.error = null;
      state.loading = true;
    });

    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.data = action.payload.data.user;
      state.error = null;
      state.loading = false;
    });

    builder.addCase(userLogin.rejected, (state, action) => {
      state.data = null;
      state.error = action.message;
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
