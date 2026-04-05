import SideBar from "@/components/layout/sideBar";
import TopBar from "@/components/layout/topBar";
import { Box } from "@mui/material";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <SideBar />

      {/* Main */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
        }}
      >
        {/* TopBar */}
        <TopBar />

        {/* Content */}
        <Box sx={{ flex: 1, p: 2 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}