import { AuthState, User } from "@/GlopalTypes/authTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
};

export const loginUser = createAsyncThunk<
  User, // ✅ return type
  { username: string; password: string }, // input
  { rejectValue: string } // error type
>("login/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(
      "https://dummyjson.com/auth/login",
      credentials,
    );

    localStorage.setItem("user", JSON.stringify(data));

    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }

    return rejectWithValue("Something went wrong");
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("user");
    },

    clearError: (state) => {
      state.error = null;
    },

    // 🔥 مهم جدًا
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setAuthReady: (state) => {
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default loginSlice.reducer;
export const { clearError, logOut, setUser, setAuthReady } = loginSlice.actions;
