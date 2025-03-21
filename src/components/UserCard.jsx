import { MessageOutlined, PersonAdd } from '@mui/icons-material';
import { Avatar, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ fullName = '', isFriend = false }) => {
  return (
    <div className="card flex flex-col items-center">
      <Avatar className="!bg-primary-main !mb-3 !h-12 !w-12">
        {fullName[0]?.toUpperCase()}
      </Avatar>
      <Link className="text-lg font-bold">{fullName}</Link>
      <div className="mt-4">
        {isFriend ? (
          <Button variant="contained" size="small">
            <MessageOutlined className="!mr-1" fontSize="small" />
            Message
          </Button>
        ) : (
          <Button variant="outlined" size="small">
            <PersonAdd className="!mr-1" fontSize="small" />
            Add Friend
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
