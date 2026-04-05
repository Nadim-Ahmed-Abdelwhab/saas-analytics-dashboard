import { configureStore } from "@reduxjs/toolkit";
import login from '@/features/login';
import theme from '@/features/theme';
import layout from '@/features/layOutSlice';
import user from '@/features/userSlice';
import product from '@/features/productSlice'
export const store = configureStore({
    reducer: {
        login,
        theme,
        layout,
        user,
        product
    }
});

export type StoreState = ReturnType <typeof store.getState>;
export type Dispatch = typeof store.dispatch;