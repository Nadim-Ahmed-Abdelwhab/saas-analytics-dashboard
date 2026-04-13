"use client";

import { Box, useTheme } from "@mui/material";

export default function Logo({ size = 36 }: { size?: number }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "10px",

        // 🔥 colors من theme
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        fontWeight: 800,
        fontSize: size / 2,
        color: theme.palette.primary.contrastText,

        letterSpacing: 1,

        // shadow based on theme
        boxShadow: `0 4px 12px ${theme.palette.primary.main}55`,

        transition: "0.3s",

        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      N
    </Box>
  );
}
