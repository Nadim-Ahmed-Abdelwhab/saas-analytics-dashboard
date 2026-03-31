"use client";

import { useSelector } from "react-redux";
import { GlopalStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useSelector(
    (state: GlopalStore) => state.login,
  );

  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated]);
  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  return children;
}
