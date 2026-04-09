import { configureStore } from "@reduxjs/toolkit";
import login from '@/features/login';
import theme from '@/features/theme';
import layout from '@/features/layOutSlice';
import user from '@/features/userSlice';
import product from '@/features/productSlice';
import cart from '@/features/cartSlice';
import post from '@/features/postSlice';
export const store = configureStore({
    reducer: {
        login,
        theme,
        layout,
        user,
        product,
        cart,
        post
    }
});

export type StoreState = ReturnType <typeof store.getState>;
export type Dispatch = typeof store.dispatch;