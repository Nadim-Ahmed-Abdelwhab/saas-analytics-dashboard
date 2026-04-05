"use client";

import ProtectedRoute from "@/components/appProtect/ProtectedRoute";
import SideBar from "@/components/layout/sideBar";
import TopBar from "@/components/layout/topBar";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <ProtectedRoute>
      {/* Content */}
      <Box
        sx={{
          flex: 1,
          p: 3,
          overflow: "auto",
        }}
      ></Box>
    </ProtectedRoute>
  );
}
