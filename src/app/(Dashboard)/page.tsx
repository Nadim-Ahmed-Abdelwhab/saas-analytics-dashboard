"use client";

import SideBar from "@/components/layout/sideBar";
import TopBar from "@/components/layout/topBar";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRight: "1px solid",
          borderColor: "divider",
          transition: ' 0.3s'
        }}
      >
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
        <Box
          sx={{
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
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
  );
}