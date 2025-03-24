import {
  HomeOutlined,
  Hub,
  Lock,
  Message,
  People,
  Translate,
} from '@mui/icons-material';
import { Drawer, IconButton, List, ListSubheader } from '@mui/material';
import { toggleDrawer } from '@redux/slices/settingsSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useDetectLayout } from '@hooks/useDetectLayout';

// const ListStyled = styled(List)`
// padding: 16px 12px
// border-radius: 4px`;

const SidebarContent = () => {
  return (
    <div className="flex w-64 flex-col gap-4">
      <List className="flex flex-col gap-4 rounded-sm bg-white !p-4 shadow">
        <Link to="/" className="flex items-center gap-1">
          <HomeOutlined fontSize="small" /> New Feeds
        </Link>
        <Link to="/messages" className="flex items-center gap-1">
          <Message fontSize="small" /> Messages
        </Link>
        <Link to="/friends" className="flex items-center gap-1">
          <People fontSize="small" /> Friends
        </Link>
        <Link to="/groups" className="flex items-center gap-1">
          <Hub fontSize="small" /> Groups
        </Link>
      </List>
      <List className="flex flex-col gap-4 rounded-sm bg-white !p-4 shadow">
        <ListSubheader className="mb-2 !px-0 !leading-none">
          Settings
        </ListSubheader>
        <Link to="/settings/account" className="flex items-center gap-1">
          <Lock />
          Account
        </Link>
        <Link to="/settings/languages" className="flex items-center gap-1">
          <Translate />
          Languages
        </Link>
      </List>
    </div>
  );
};

const Sidebar = () => {
  const { isMinimizeLayout } = useDetectLayout();
  const isShowDrawer = useSelector((store) => store.settings.isShowDrawer);
  const dispatch = useDispatch();

  // console.log('isMobile:', isMinimizeLayout, 'isShowDrawer:', isShowDrawer);
  const handleCloseSidebar = () => {
    dispatch(toggleDrawer());
  };

  return isMinimizeLayout ? (
    <Drawer
      open={isShowDrawer}
      onClose={() => dispatch(toggleDrawer())}
      classes={{ paper: '!p-4 !bg-dark-200 flex flex-col gap-4' }}
    >
      <div className="flex justify-between">
        <Link to="/">
          <img src="/NaLa.png" className="!h-10 w-10" />
        </Link>
        <IconButton onClick={handleCloseSidebar}>
          <CloseIcon />
        </IconButton>
      </div>
      <SidebarContent />
    </Drawer>
  ) : (
    <SidebarContent />
  );
};

export default Sidebar;
