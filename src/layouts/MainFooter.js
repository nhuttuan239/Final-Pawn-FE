import { Link, Typography } from "@mui/material";
import React from "react";

function MainFooter() {
  return (
    <Typography variant="body2" color="text.secondary" textAlign="center">
      {"Copyright ® "}
      <Link color="inherit" href="https://www.camdocantho.com">
        PawnManagement
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default MainFooter;
