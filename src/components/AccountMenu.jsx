import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar, Box, Menu, MenuItem, Divider, IconButton, Tooltip } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext';
import { useAlerts } from '../contexts/AlertsContext';
import styled from 'styled-components';
import { v4 } from 'uuid';

const StyledMenuItem = styled(MenuItem)`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const CustomMenuItem = ({ to, onClick: onClickFromProps, children }) => {
  const navigate = useNavigate();
  const onClick = to ? () => navigate(to) : () => null;
  return <StyledMenuItem onClick={onClickFromProps || onClick}>{children}</StyledMenuItem>;
};

CustomMenuItem.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default function AccountMenu() {
  const [avatarId] = useState(v4());
  const { setMessage } = useAlerts();
  const [profileImageError, setProfileImageError] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const anchorEl = React.useRef(null);

  const setError = (error) => setMessage(error, 'error');

  const { currentUser, logout } = useAuth();

  const { photoUrl } = currentUser || {};

  useEffect(() => {
    setProfileImageError(false);
  }, [photoUrl]);

  async function handleLogout() {
    console.log('Handling logout');
    try {
      await logout();
    } catch (e) {
      setError('Failed to log out');
    }
  }

  const randomAvatar = !currentUser || profileImageError;

  return (
    <React.Fragment>
      <Box ref={anchorEl} sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            size="small"
            sx={{ ml: 2 }}
            aria-controls={isOpened ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isOpened ? 'true' : undefined}
            onClick={() => setIsOpened(true)}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <img
                style={{ width: '100%' }}
                alt="M"
                src={randomAvatar ? `https://robohash.org/${avatarId}` : photoUrl}
                onError={() => setProfileImageError(true)}
              />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl.current}
        id="account-menu"
        open={isOpened}
        onClose={() => setIsOpened(false)}
        onClic={() => setIsOpened(false)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {!currentUser && (
          <CustomMenuItem to="/login">
            Log In
            <LoginIcon />
          </CustomMenuItem>
        )}
        {!currentUser && (
          <CustomMenuItem to="/register">
            Sing Up
            <PersonAdd />
          </CustomMenuItem>
        )}
        {currentUser && (
          <CustomMenuItem to="/account">
            Account
            <Avatar />
          </CustomMenuItem>
        )}
        <Divider />
        {currentUser && (
          <CustomMenuItem to="/settings">
            Settings
            <Settings />
          </CustomMenuItem>
        )}
        {currentUser && (
          <CustomMenuItem onClick={handleLogout}>
            Logout
            <Logout />
          </CustomMenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
}
