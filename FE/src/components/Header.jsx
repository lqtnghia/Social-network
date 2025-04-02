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
  Settings,
  ElectricBolt,
} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Badge,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
} from '@mui/material';
import { toggleDrawer } from '@redux/slices/settingsSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

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
      <MenuItem
        onClick={() => {
          navigate('/users');
        }}
      >
        Profile
      </MenuItem>
      <MenuItem onClick={() => navigate('/change-password')}>
        Change Password
      </MenuItem>
      <MenuItem onClick={() => logOut()}>Logout</MenuItem>
    </Menu>
  );

  const handleUserProfileClick = (e) => {
    setAnchorEl(e.target);
  };
  // console.log(userInfo);

  const getNavigate = ({ isActive }) =>
    `rounded-full px-10 py-2 hover:cursor-pointer  ${
      isActive
        ? 'bg-primary-main text-white'
        : 'hover:bg-slate-400 hover:shadow-sm bg-primary-bgdark'
    }`;
  return (
    <div className="bg-primary-dark flex">
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
            <div className="flex flex-2 items-center gap-4">
              <Link to="/">
                <p className="text-primary-main font-['Fredoka_One'] text-3xl font-bold">
                  NghiaSocial
                </p>
              </Link>
              <div className="!mx-5 flex flex-1 items-center gap-4">
                <TextField
                  className="bg-primary-bgdark rounded-[20px]"
                  variant="outlined"
                  name="search"
                  placeholder="Search"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      navigate('/search/users', { state: { searchTerm } });
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search className="text-slate-300" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '20px', // Bo góc mềm hơn
                      borderColor: '#ccc', // Màu viền mặc định
                      '&:hover fieldset': {
                        borderColor: 'primary-main', // Đổi màu viền khi hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary-main', // Màu viền khi focus
                        borderWidth: '2px',
                      },
                    },
                    '.MuiInputBase-input': {
                      paddingLeft: '10px', // Giúp chữ không quá sát icon
                      '::placeholder': {
                        color: '#cad5e2', // Thay đổi màu của placeholder
                        opacity: 1, // Để tránh bị làm mờ trên một số trình duyệt
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}
          {!isMinimizeLayout && (
            <div className="flex flex-1 items-center justify-start gap-5">
              <NavLink to="/" className={getNavigate}>
                <IconButton size="medium">
                  <Home sx={{ color: '#DDD' }} />
                </IconButton>
              </NavLink>
              <NavLink to="/stories" className={getNavigate}>
                <IconButton size="medium">
                  <ElectricBolt sx={{ color: '#DDD' }} />
                </IconButton>
              </NavLink>
              <NavLink to="/Video" className={getNavigate}>
                <IconButton size="medium">
                  <OndemandVideo sx={{ color: '#DDD' }} />
                </IconButton>
              </NavLink>
              <NavLink to="/group" className={getNavigate}>
                <IconButton size="medium">
                  <Storefront sx={{ color: '#DDD' }} />
                </IconButton>
              </NavLink>
            </div>
          )}

          <div className="flex flex-1 justify-end">
            <IconButton size="medium">
              {isMinimizeLayout && <Search />}
              <Badge badgeContent={2} color="error">
                <Notifications color="primary" />
              </Badge>
            </IconButton>
            <IconButton size="medium">
              <Badge badgeContent={6} color="error">
                <QuestionAnswer color="primary" />
              </Badge>
            </IconButton>
            <IconButton size="medium">
              <Settings sx={{ color: '#DDD' }} />
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
