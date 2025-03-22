import { Avatar, Button } from '@mui/material';
import React from 'react';

const FriendReq = ({ fullName = '', image }) => {
  return (
    <div className="!mb-2 flex gap-2 rounded bg-slate-200 !p-3">
      <Avatar className="!bg-primary-main">
        {image ? (
          <img src={image} />
        ) : (
          fullName.split(' ').slice(-1)[0].charAt(0).toUpperCase()
        )}
      </Avatar>

      <div className="flex flex-col gap-2">
        <div>
          <p className="font-bold">{fullName}</p>
          <p className="text-dark-400 text-sm"> 4 mutual friends</p>
        </div>
        <div className="flex justify-between gap-1">
          <Button size="small" variant="contained">
            Comfirm
          </Button>
          <Button size="small" variant="outlined">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FriendReq;
