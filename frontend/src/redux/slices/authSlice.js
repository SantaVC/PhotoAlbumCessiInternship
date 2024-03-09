import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (data) => {
  await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  return { ...data, token: "123" };
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state, { payload }) => {
      state.data = null;
      state.loading = true;
    });

    builder.addCase(fetchAuth.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    });

    builder.addCase(fetchAuth.rejected, (state, { payload }) => {
      state.data = null;
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
