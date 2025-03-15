import {
  HomeOutlined,
  Hub,
  Lock,
  Message,
  People,
  Translate,
} from '@mui/icons-material';
import { List, ListSubheader } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

// const ListStyled = styled(List)`
// padding: 16px 12px
// border-radius: 4px`;

const Sidebar = () => {
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

export default Sidebar;
