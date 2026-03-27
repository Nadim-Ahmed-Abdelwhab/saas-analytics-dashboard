import { configureStore } from "@reduxjs/toolkit";
import login from '@/features/login';
import theme from '@/features/theme'
export const store = configureStore({
    reducer: {
        login,
        theme,
    }
});

export type GlopalStore = ReturnType <typeof store.getState>;
export type Dispatch = typeof store.dispatch;