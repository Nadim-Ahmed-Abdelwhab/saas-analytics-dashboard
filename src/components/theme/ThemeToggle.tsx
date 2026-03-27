'use client'
import { toggleTheme } from "@/features/theme";
import { Dispatch, GlopalStore } from "@/store/store";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function ThemeToggle() {
  const dispatch = useDispatch<Dispatch>();
  const {mode} = useSelector((state : GlopalStore)=> state.theme);
  return (
    <IconButton onClick={()=> dispatch(toggleTheme())}>
      {mode === 'light' ? <DarkModeIcon/> : <LightModeIcon/>}
    </IconButton>
  )
}

