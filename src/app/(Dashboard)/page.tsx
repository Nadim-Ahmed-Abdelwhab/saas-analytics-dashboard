"use client";

import ProtectedRoute from "@/components/appProtect/ProtectedRoute";
import SideBar from "@/components/layout/sideBar";
import TopBar from "@/components/layout/topBar";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <ProtectedRoute>
    <Box sx={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <Box>
        <SideBar/>
      </Box>

      {/* Main Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
        }}
      >
        {/* TopBar */}
        <Box>
          <TopBar />
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            overflow: "auto",
          }}
        >

        </Box>
      </Box>
    </Box>
    </ProtectedRoute>
  );
}