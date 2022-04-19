import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function AccountMenu() {
  const [profileImageError, setProfileImageError] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  const { photoUrl } = currentUser || {};

  useEffect(() => {
    setProfileImageError(false);
  }, [photoUrl]);

  async function handleLogout() {
    setError("");

    try {
      console.log(currentUser.email);
      await logout();
      console.log("the user logout");
      console.log(currentUser?.email);
      // history.push("/login")
    } catch (e) {
      console.log(e.message);
      setError("Failed to log out");
    }
  }

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {currentUser && !profileImageError ? (
                <img
                  style={{ width: "100%", height: "100%" }}
                  alt="M"
                  src={photoUrl}
                  onError={() => setProfileImageError(true)}
                />
              ) : (
                "M"
              )}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {!currentUser && (
          <MenuItem>
            <Link value="/profile" to="/profile" component={RouterLink}>
              <Avatar />
              Log In
            </Link>
          </MenuItem>
        )}
        {!currentUser && (
          <MenuItem>
            <Link value="/new" to="/new" component={RouterLink}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Sing Up
            </Link>
          </MenuItem>
        )}
        {currentUser && (
          <MenuItem>
            <Link value="/account" to="/account" component={RouterLink}>
              <Avatar />
              Account
            </Link>
          </MenuItem>
        )}
        <Divider />
        {currentUser && (
          <MenuItem>
            <Link value="/settings" to="/settings" component={RouterLink}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </Link>
          </MenuItem>
        )}
        {currentUser && (
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
}
