"use client";
import { Box } from "@mui/material";
import React from "react";
import ThemeToggle from "../theme/ThemeToggle";

import { useTheme } from "@mui/material";
export default function TopBar() {

  const theme = useTheme();

  console.log(theme.palette.mode);
  return (
    <Box>
      <Box >Saas-Dashboard</Box>

      <Box>
        <ThemeToggle />
      </Box>
    </Box>
  );
}
