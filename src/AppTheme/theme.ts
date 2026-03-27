'use client'

import { createTheme } from "@mui/material"
import { darkPalette, lightPalette } from "./palette";

const getTheme = (mode : 'light' | 'dark') => createTheme({
    palette: {
        mode,
        ...(mode === 'light' ? lightPalette : darkPalette)
    },

    shape: {
      borderRadius: 12,
    },

    typography: {
      fontFamily: "Inter, sans-serif",
    }
})
export default getTheme;

