import { Box } from "@mui/material";
import React from "react";
import logoImg from "../logo.png";
import { Link } from "react-router-dom";

function Logo(props) {
  const { disableLink, sx } = props;
  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img src={logoImg} alt="logo" width="100%" />
    </Box>
  );
  if (disableLink) return <>{logo}</>;
  return <Link to="/">{logo}</Link>;
}

export default Logo;
