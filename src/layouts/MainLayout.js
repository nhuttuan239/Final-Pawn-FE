import { Box, Stack } from "@mui/material";
import React from "react";

import MainFooter from "./MainFooter";
import { Outlet } from "react-router-dom";
import AlertMsg from "../components/AlertMsg";
import SideMenu from "./SideMenu";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <SideMenu />
      <AlertMsg />
      <Outlet />
      {/* To push the footer to the bottom in case the outlet content is too short */}
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
