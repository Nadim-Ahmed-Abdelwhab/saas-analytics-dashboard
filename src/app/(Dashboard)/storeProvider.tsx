"use client";
import CssBaseline from "@mui/material/CssBaseline";
import { Dispatch, GlopalStore, store } from "@/store/store";
import { ThemeProvider } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import getTheme from "@/AppTheme/theme";
import { ThemeMode } from "@/GlopalTypes/Types";
import { setTheme } from "@/features/theme";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<Dispatch>();
  const { mode } = useSelector((state: GlopalStore) => state.theme);
  const theme = useMemo(() => getTheme(mode), [mode]);

  useEffect(()=>{
    const saved = localStorage.getItem('theme') as ThemeMode;
    if (saved) dispatch(setTheme(saved));
  },[dispatch])
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
      <ThemeWrapper>{children}</ThemeWrapper>
    </Provider>
  );
}
