import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivateClient } from "../../axios";
import {
  addItem,
  deleteItem,
  setItems,
  setIsLoading,
} from "../slices/postsSlice";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { dispatch }) => {
    try {
      dispatch(setIsLoading(true));

      const { data } = await axiosPrivateClient.get("/posts");

      console.log(data);
      dispatch(setItems(data));
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error.");
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, { dispatch }) => {
    try {
      dispatch(setIsLoading(true));

      const { data } = await axiosPrivateClient.post(
        "/posts/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(data.post);

      dispatch(addItem(data.post));
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error.");
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (item, { dispatch }) => {
    try {
      dispatch(setIsLoading(true));

      await axiosPrivateClient.delete(`/posts/delete/${item.id}`, {
        headers: { data: item.id },
      });

      dispatch(deleteItem(item));
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error.");
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
