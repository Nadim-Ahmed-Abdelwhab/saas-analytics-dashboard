"use client";

import { Box, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeToggle from "../theme/ThemeToggle";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";
import { toggleSideBar } from "@/features/layOutSlice";

export default function TopBar() {
  const dispatch = useDispatch<Dispatch>();
  return (
    <Box
      sx={{
        width: "100%",
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton onClick={() => dispatch(toggleSideBar())}>
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            letterSpacing: 1,
          }}
        >
          SaaS{" "}
          <Box component="span" sx={{ color: "text.secondary" }}>
            Dashboard
          </Box>
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <ThemeToggle />
      </Box>
    </Box>
  );
}
