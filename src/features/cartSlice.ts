import { CartData, CartProducts } from "./../GlopalTypes/cartTypes";
import { CartState } from "@/GlopalTypes/cartTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const savedCart =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cart") || "null")
    : null;

function saveToLocal(cart: CartData) {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
const initialState: CartState = {
  loading: false,
  error: false,
  cartData: savedCart || {
    id: 1,
    products: [],
    total: 0,
    discountedTotal: 0,
    userId: 1,
    totalProducts: 0,
    totalQuantity: 0,
  },
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProducts>) => {
      if (!state.cartData) {
        state.cartData = {
          id: 1,
          products: [],
          total: 0,
          discountedTotal: 0,
          userId: 1,
          totalProducts: 0,
          totalQuantity: 0,
        };
      }

      const product = action.payload;

      const exist = state.cartData.products.find((p) => p.id === product.id);

      if (exist) {
        exist.quantity += 1;
        exist.total = exist.price * exist.quantity;
      } else {
        state.cartData.products.push({
          ...product,
          quantity: 1,
          total: product.price,
        });
      }

      // 🔥 update totals
      state.cartData.total = state.cartData.products.reduce(
        (acc, item) => acc + item.total,
        0,
      );

      state.cartData.totalQuantity = state.cartData.products.reduce(
        (acc, item) => acc + item.quantity,
        0,
      );

      state.cartData.totalProducts = state.cartData.products.length;
      saveToLocal(state.cartData as CartData);
    },
    increase: (state, action) => {
      const item = state.cartData?.products.find(
        (p) => p.id === action.payload,
      );
      if (item) {
        item.quantity += 1;
        item.total = item?.price * item?.quantity;
      }

      if (state.cartData) {
        state.cartData.total = state.cartData.products.reduce(
          (asc, item) => asc + item.total,
          0,
        );
      }
      saveToLocal(state.cartData as CartData);
    },
    decrease: (state, action) => {
      const item = state.cartData?.products.find(
        (p) => p.id === action.payload,
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.total = item?.price * item?.quantity;
      }
      if (state.cartData) {
        state.cartData.total = state.cartData.products.reduce(
          (asc, item) => asc + item.total,
          0,
        );
      }
      saveToLocal(state.cartData as CartData);
    },
    remove: (state, action) => {
      if (!state.cartData) return;
      state.cartData.products = state.cartData.products.filter(
        (p) => p.id !== action.payload,
      );
      if (state.cartData) {
        state.cartData.total = state.cartData.products.reduce(
          (asc, item) => asc + item.total,
          0,
        );
      }
      saveToLocal(state.cartData as CartData);
    },
  },
});
export default cartSlice.reducer;
export const { addToCart, decrease, increase, remove } = cartSlice.actions;
