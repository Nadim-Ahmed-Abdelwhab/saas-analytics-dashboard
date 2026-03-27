"use client";
import CssBaseline from "@mui/material/CssBaseline";
import { GlopalStore, store } from "@/store/store";
import { ThemeProvider } from "@mui/material";
import React, { useMemo } from "react";
import { Provider, useSelector } from "react-redux";
import getTheme from "@/AppTheme/theme";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { mode } = useSelector((state: GlopalStore) => state.theme);
  const theme = useMemo(() => getTheme(mode), [mode]);
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
