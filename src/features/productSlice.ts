import { ProductsResponse, ProductsState } from "@/GlopalTypes/productsTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const productsData = createAsyncThunk<
  ProductsResponse,
  { limit: number; skip: number; search?: string }
>("products/productsData", async ({ limit, skip, search }) => {
  const url = search
    ? `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`
    : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
  const { data } = await axios.get<ProductsResponse>(url);
  return data;
});

const initialState: ProductsState = {
  loading: false,
  error: false,
  product: null,
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        productsData.fulfilled,
        (state, action: PayloadAction<ProductsResponse>) => {
          state.loading = false;
          state.product = action.payload;
        },
      )
      .addCase(productsData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default productSlice.reducer;
