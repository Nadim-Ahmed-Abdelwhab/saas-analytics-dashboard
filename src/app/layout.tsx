import React from "react";
import StoreProvider from "./(Dashboard)/storeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
        <AppRouterCacheProvider>
            <StoreProvider>{children}</StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
