import { PostResponse, PostState } from "@/GlopalTypes/postTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const allPosts = createAsyncThunk<
  PostResponse,
  { limit: number; skip: number; search?: string }
>("post/allPosts", async ({ limit, skip, search }) => {
  const url = search
    ? `https://dummyjson.com/posts/search?q=${search}&limit=${limit}&skip=${skip}`
    : `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`;
  const { data } = await axios.get<PostResponse>(url);
  return data;
});

const initialState: PostState = {
  loading: false,
  error: false,
  postData: null,
};
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allPosts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        allPosts.fulfilled,
        (state, action: PayloadAction<PostResponse>) => {
          state.loading = false;
          state.postData = action.payload;
        },
      )
      .addCase(allPosts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default postSlice.reducer;
