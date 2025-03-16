import { useDetectLayout } from '@hooks/index';
import { useLogout } from '@hooks/useLogout';
import { useUserInfo } from '@hooks/useUserInfo';
import {
  AccountCircle,
  Notifications,
  Search,
  Menu as MenuIcon,
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
import { Link } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
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
  console.log(userInfo);
  return (
    <div>
      <AppBar color="white" position="static" className="!py-4">
        <Toolbar className="!min-h-fit justify-between">
          {isMinimizeLayout ? (
            <IconButton onClick={() => dispatch(toggleDrawer())}>
              <MenuIcon />
            </IconButton>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/">
                <img src="/Logo.png" className="h-8 w-8" />
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
                  sx={{
                    '.MuiInputBase-root::before': {
                      display: 'none',
                    },
                  }}
                />
              </div>
            </div>
          )}
          <div>
            <IconButton size="medium">
              {isMinimizeLayout && <Search />}
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton size="medium" onClick={handleUserProfileClick}>
              {/* <AccountCircle /> */}
              <Avatar className="!bg-primary-main">
                {/* {userInfo?.fullName?.[0]?.toUpperCase()} */}
                {
                  userInfo?.fullName
                    ? userInfo.fullName
                        .split(' ') // Tách chuỗi thành mảng các từ
                        .slice(-1)[0] // Lấy từ cuối cùng
                        .charAt(0) // Lấy ký tự đầu tiên của từ cuối cùng
                        .toUpperCase() // Chuyển thành in hoa
                    : '' // Giá trị mặc định nếu userInfo hoặc fullName không tồn tại
                }
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
