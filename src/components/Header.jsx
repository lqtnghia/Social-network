import { useDetectLayout } from '@hooks/useDetectLayout';
import { useLogout } from '@hooks/useLogout';
import { useUserInfo } from '@hooks/useUserInfo';
import {
  AccountCircle,
  Notifications,
  Search,
  Menu as MenuIcon,
  QuestionAnswer,
  Category,
  Home,
  OndemandVideo,
  Storefront,
  Group,
  SportsEsports,
} from '@mui/icons-material';
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
import { toggleDrawer } from '@redux/slices/settingsSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const userInfo = useUserInfo();
  const { logOut } = useLogout();
  const { isMinimizeLayout } = useDetectLayout();
  const dispatch = useDispatch();

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
  // console.log(userInfo);
  return (
    <div className="flex">
      <AppBar color="white" position="static">
        <Toolbar
          className="container !min-h-fit justify-between"
          aria-hidden={false}
        >
          {isMinimizeLayout ? (
            <IconButton onClick={() => dispatch(toggleDrawer())}>
              <MenuIcon />
            </IconButton>
          ) : (
            <div className="flex flex-1 items-center gap-4">
              <Link to="/">
                <img src="/NaLa.png" className="h-12 w-12" />
              </Link>
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
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      navigate('/search/users', {
                        state: {
                          searchTerm,
                        },
                      });
                    }
                  }}
                  sx={{
                    '.MuiInputBase-root::before': {
                      display: 'none',
                    },
                  }}
                />
              </div>
            </div>
          )}
          {!isMinimizeLayout && (
            <div className="flex flex-1 items-center justify-between gap-1">
              <div className="rounded-sm !px-10 !py-2 hover:cursor-pointer hover:bg-slate-400 hover:shadow-sm">
                <IconButton size="medium">
                  <Home />
                </IconButton>
              </div>
              <div className="rounded-sm !px-10 !py-2 hover:cursor-pointer hover:bg-slate-400 hover:shadow-sm">
                <IconButton size="medium">
                  <OndemandVideo />
                </IconButton>
              </div>
              <div className="rounded-sm !px-10 !py-2 hover:cursor-pointer hover:bg-slate-400 hover:shadow-sm">
                <IconButton size="medium">
                  <Storefront />
                </IconButton>
              </div>
            </div>
          )}

          <div className="flex flex-1 justify-end">
            <IconButton size="medium">
              <Category />
            </IconButton>
            <IconButton size="medium">
              <QuestionAnswer />
            </IconButton>
            <IconButton size="medium">
              {isMinimizeLayout && <Search />}
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton size="medium" onClick={handleUserProfileClick}>
              {/* <AccountCircle /> */}
              <Avatar className="!bg-primary-main">
                {userInfo?.fullName
                  .split(' ')
                  .slice(-1)[0]
                  .charAt(0)
                  .toUpperCase()}
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
