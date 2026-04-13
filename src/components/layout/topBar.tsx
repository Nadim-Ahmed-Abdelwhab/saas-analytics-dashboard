"use client";

import { Box, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeToggle from "../theme/ThemeToggle";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";
import { toggleSideBar } from "@/features/layOutSlice";
import Logo from "../ui/Logo";

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
      {/* LEFT */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <IconButton onClick={() => dispatch(toggleSideBar())}>
          <MenuIcon />
        </IconButton>

        {/* Logo + Name */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Logo size={36} />

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              letterSpacing: 0.5,
              fontSize: "18px",
            }}
          >
            NexBoard{" "}
            <Box
              component="span"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
              }}
            >
              Dashboard
            </Box>
          </Typography>
        </Box>
      </Box>

      {/* RIGHT */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <ThemeToggle />
      </Box>
    </Box>
  );
}
