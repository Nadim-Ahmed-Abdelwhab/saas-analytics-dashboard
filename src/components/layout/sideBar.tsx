"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArticleIcon from "@mui/icons-material/Article";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { GlopalStore } from "@/store/store";

const links = [
  { label: "Overview", href: "/", icon: <DashboardIcon /> },
  { label: "Users", href: "/users", icon: <PeopleIcon /> },
  { label: "Products", href: "/products", icon: <InventoryIcon /> },
  { label: "Posts", href: "/posts", icon: <ArticleIcon /> },
  { label: "Cart", href: "/cart", icon: <ShoppingCartIcon /> },
];

export default function SideBar() {
  const pathname = usePathname();
  const open = useSelector(
    (state: GlopalStore) => state.layout.sideBarOpen
  );

  return (
    <Box
      sx={{
        width: open ? 220 : 80,
        transition: "0.3s",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        p: 1,
        overflow: "hidden",
      }}
    >
      {/* Links */}
      <Box display="flex" flexDirection="column" gap={1}>
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: open ? "flex-start" : "center",
                  gap: 2,
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  bgcolor: active ? "primary.main" : "transparent",
                  color: active ? "#fff" : "text.secondary",
                  transition: "0.2s",

                  "&:hover": {
                    bgcolor: active ? "primary.main" : "action.hover",
                    color: active ? "#fff" : "text.primary",
                  },
                }}
              >
                {link.icon}

                {open && <Typography>{link.label}</Typography>}
              </Box>
            </Link>
          );
        })}
      </Box>

      {/* Logout */}
      <Box>
        <Link href="#" style={{ textDecoration: "none" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: open ? "flex-start" : "center",
              gap: 2,
              px: 2,
              py: 1.5,
              borderRadius: 2,
              color: "error.main",
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <LogoutIcon />
            {open && <Typography>Logout</Typography>}
          </Box>
        </Link>
      </Box>
    </Box>
  );
}