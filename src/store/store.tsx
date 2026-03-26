import { configureStore } from "@reduxjs/toolkit";
import login from '@/features/login'
export const store = configureStore({
    reducer: {
        login,
    }
})