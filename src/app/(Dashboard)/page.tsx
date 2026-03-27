import TopBar from "@/components/layout/topBar";
import { Box, Grid } from "@mui/material";
import React from "react";

export default function page() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* sideBar */}
      <Box sx={{ width: "360px" }}>sidebar</Box>

      {/* top and main content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* topbar */}
        <Box
          sx={{
            height: "90px",
            width: '100vh',
            backgroundColor: 'background.paper'
          }}
        >
          <TopBar/>
        </Box>

        {/* main contetnt */}
        <Box
          sx={{
            height: "100vh",
          }}
        >
          main
        </Box>

      </Box>
    </Box>
  );
}
