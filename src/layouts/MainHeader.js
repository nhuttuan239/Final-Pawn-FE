import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import useAuth from "../hooks/useAuth";

import { Avatar, Divider } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function MainHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    try {
      handleProfileMenuClose();
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {}
  };

  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleProfileMenuClose}
    >
      <Box sx={{ my: 1.5, px: 1.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.username}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {user?.role}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: "dash" }} />

      <Divider sx={{ borderStyle: "dash" }} />
      <MenuItem onClick={handleLogout} sx={{ mx: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );
  return (
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      ></IconButton>

      <Box sx={{ flexGrow: 1 }}></Box>

      <Avatar
        src={user?.username}
        alt="Avatar"
        onClick={handleProfileMenuOpen}
      />

      {renderMenu}
    </Toolbar>
  );
}

export default MainHeader;
