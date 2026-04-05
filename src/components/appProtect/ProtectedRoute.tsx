"use client";

import { useSelector } from "react-redux";
import { StoreState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useSelector(
    (state: StoreState) => state.login,
  );

  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated]);
  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width:'100vh',
        height: '100vh',
      }}>
        <Typography variant="h4">Loding...</Typography>
        <CircularProgress />
      </Box>
    );
  }

  return children;
}
