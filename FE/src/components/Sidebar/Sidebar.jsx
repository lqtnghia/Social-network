import {
  EmojiEvents,
  Equalizer,
  Hub,
  InsertDriveFile,
  Language,
  LiveTv,
  MailOutline,
  PinDrop,
  Settings,
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
    <div className="!m-auto flex w-64 flex-col gap-4">
      <List className="bg-primary-dark flex flex-col gap-4 rounded-sm !p-4 shadow">
        <ListSubheader className="!bg-primary-dark mb-2 !px-0 !leading-none !text-slate-400">
          New Feeds
        </ListSubheader>
        <Link to="/" className="flex items-center gap-1">
          <div
            style={{
              background: 'linear-gradient(to right, #0575e6, #021b79)',
            }}
            className="icon"
          >
            <InsertDriveFile fontSize="small" />
          </div>
          Newfeeds
        </Link>
        <Link to="/Badges" className="flex items-center gap-1">
          <div
            style={{
              background: 'linear-gradient(to right, #e44d26, #f16529)',
            }}
            className="icon"
          >
            <EmojiEvents fontSize="small" />
          </div>
          Badges
        </Link>
        <Link to="/Stories" className="flex items-center gap-1">
          <div
            style={{
              background: 'linear-gradient(to right, #f2994a, #f2c94c)',
            }}
            className="icon"
          >
            <Language fontSize="small" />
          </div>
          Explore Stories
        </Link>
        <Link to="/groups" className="flex items-center gap-1">
          <div
            style={{
              background: 'linear-gradient(to right, #ee0979, #ff6a00)',
            }}
            className="icon"
          >
            <Hub fontSize="small" />
          </div>
          Popuplar Groups
        </Link>
      </List>
      <List className="bg-primary-dark flex flex-col gap-2 rounded-sm !p-4 shadow">
        <ListSubheader className="!bg-primary-dark mb-2 !px-0 !leading-none !text-slate-400">
          More Pages
        </ListSubheader>
        <Link to="/settings/account" className="flex items-center gap-1">
          <div className="icon">
            <MailOutline color="info" fontSize="large" />
          </div>
          Email Box
        </Link>
        <Link to="/settings/account" className="flex items-center gap-1">
          <div className="icon">
            <PinDrop fontSize="large" color="info" />
          </div>
          Lastest Event
        </Link>
        <Link to="/settings/account" className="flex items-center gap-1">
          <div className="icon">
            <LiveTv fontSize="large" color="info" />
          </div>
          Live Stream
        </Link>
      </List>
      <List className="bg-primary-dark flex flex-col gap-2 rounded-sm !p-4 shadow">
        <ListSubheader className="!bg-primary-dark mb-2 !px-0 !leading-none !text-slate-400">
          Settings
        </ListSubheader>
        <Link to="/settings/account" className="flex items-center gap-1">
          <div className="icon">
            <Settings fontSize="medium" />
          </div>
          Settings
        </Link>
        <Link to="/settings/account" className="flex items-center gap-1">
          <div className="icon">
            <Equalizer fontSize="medium" />
          </div>
          Analytics
        </Link>
        <Link to="/settings/languages" className="flex items-center gap-1">
          <div className="icon">
            <Translate fontSize="medium" />
          </div>
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
          <p className="text-primary-main font-['Fredoka_One'] text-3xl font-bold">
            NghiaSocial
          </p>
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
