import { useLogout } from '@hooks/useLogout';
import { useUserInfo } from '@hooks/useUserInfo';
import { AccountCircle, Notifications, Search } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
} from '@mui/material';
import React, { useState } from 'react';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const userInfo = useUserInfo();
  const { logOut } = useLogout();

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const renderMenu = (
    <Menu
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={handleCloseMenu}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem onClick={() => logOut()}>Logout</MenuItem>
    </Menu>
  );

  const handleUserProfileClick = (e) => {
    setAnchorEl(e.target);
  };

  return (
    <div>
      <AppBar color="white" position="static" className="!py-4">
        <Toolbar className="!min-h-fit justify-between">
          <div className="flex items-center gap-4">
            <img src="/Logo.png" className="h-8 w-8" />
            <div className="flex items-center gap-4">
              <Search />
              <TextField
                variant="standard"
                name="search"
                placeholder="search"
                fullWidth
                slotProps={{
                  input: { className: 'h-10 px-3 py-2' },
                  htmlInput: { className: '!p-0' },
                }}
              />
            </div>
          </div>
          <div>
            <IconButton size="medium">
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton size="medium" onClick={handleUserProfileClick}>
              {/* <AccountCircle /> */}
              <Avatar className="!bg-primary-main">
                {userInfo?.fullName?.[0]?.toUpperCase()}
              </Avatar>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default Header;
