import { UsersResponse, UserState } from "@/GlopalTypes/userTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const user = createAsyncThunk<
  UsersResponse,
  { limit: number; skip: number, search?: string }
>("user/userData", async ({ limit, skip ,search}) => {
  const url = search ? 
  `https://dummyjson.com/users/search?q=${search}&limit=${limit}&skip=${skip}`:
  `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
  const { data } = await axios.get<UsersResponse>(url);
  return data;
});


const initialState: UserState = {
  loading: false,
  error: false,
  userData: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(user.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        user.fulfilled,
        (state, action: PayloadAction<UsersResponse>) => {
          state.loading = false;
          state.userData = action.payload;
        },
      )
      .addCase(user.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
export default userSlice.reducer;
