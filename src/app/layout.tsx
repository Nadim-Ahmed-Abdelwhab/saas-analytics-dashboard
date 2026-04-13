import React from "react";
import StoreProvider from "./(Dashboard)/storeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
export const metadata = {
  title: "NexBoard | SaaS Dashboard",
  description: "Full-featured dashboard built with Next.js and Redux Toolkit",
  icons: {
    icon: '/icon.png'
  }
};
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
