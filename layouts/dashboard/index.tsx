import type { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";
import { Box, Stack } from "@mui/material";

export function DashboardLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />
      <Box sx={{ px: { xs: 1, lg: 6 }, py: 3, mt: "10rem" }} flex="1">
        {children}
      </Box>
      <Footer />
    </Stack>
  );
}
