import { Avatar, Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const FriendMessageItem = ({ friend }) => {
  return (
    <div>
      <Box
        sx={{
          padding: '8px 12px',
          borderRadius: '8px',
          transition: 'background-color 0.2s ease',
          '&:hover': {
            backgroundColor: '#f5f6f8',
            color: '#1a73e8',
          },
        }}
      >
        <Link
          key={friend.id}
          to={`/users/${friend.id}`}
          className="flex items-center gap-1"
          sx={{
            '&:hover': {
              backgroundColor: '#f0f0f0',
              color: '#1a73e8',
            },
          }}
        >
          <Avatar
            className="!bg-primary-main"
            sx={{ width: 30, height: 30, fontSize: 15, marginRight: 1 }}
            src={friend.image}
          >
            {friend.fullName.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <p className="text-sm font-bold">{friend.fullName}</p>
            <p className="text-dark-400 text-[10px]">{friend.email}</p>
          </div>
        </Link>
      </Box>
    </div>
  );
};

export default FriendMessageItem;
