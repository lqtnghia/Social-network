import { Check, Close } from '@mui/icons-material';
import { Avatar, Button } from '@mui/material';
import React from 'react';

const FriendRequestItem = ({ fullName = '' }) => {
  return (
    <div className="flex flex-col gap-2 rounded bg-slate-200 !p-3">
      <div className="flex gap-2">
        <div>
          <Avatar className="!bg-primary-main">
            {fullName.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
          </Avatar>
        </div>
        <div>
          <p className="font-bold">{fullName}</p>
          <p className="text-dark-400 text-sm"> 4 mutual friends</p>
        </div>
      </div>
      <div className="!mt-2 flex justify-center !space-x-1">
        <Button size="small" variant="contained">
          <Check className="!mr-1" fontSize="small" /> Comfirm
        </Button>
        <Button size="small" variant="outlined">
          <Close className="!mr-1" fontSize="small" /> Delete
        </Button>
      </div>
    </div>
  );
};

export default FriendRequestItem;
