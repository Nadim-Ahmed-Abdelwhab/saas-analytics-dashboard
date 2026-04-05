"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { store, StoreState, Dispatch } from "@/store/store";
import { ThemeProvider } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import getTheme from "@/AppTheme/theme";
import { setTheme } from "@/features/theme";
import { setAuthReady, setUser } from "@/features/login";

function AppWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<Dispatch>();

  const { mode } = useSelector((state: StoreState) => state.theme);

  // 🎨 Theme
  const theme = useMemo(() => getTheme(mode), [mode]);

  // 🌙 load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  // 🔐 load user
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)));
    }
    dispatch(setAuthReady());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AppWrapper>{children}</AppWrapper>
    </Provider>
  );
}