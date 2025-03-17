import { Avatar, Button } from '@mui/material';
import React from 'react';

const FriendReq = ({ fullName = '', image }) => {
  return (
    <div className="!mb-2 flex gap-2 rounded bg-slate-200 !p-3">
      <Avatar className="!bg-primary-main">
        {image ? (
          <img src={image} />
        ) : (
          fullName
            .split(' ') // Tách chuỗi thành mảng các từ
            .slice(-1)[0] // Lấy từ cuối cùng
            .charAt(0) // Lấy ký tự đầu tiên của từ cuối cùng
            .toUpperCase() // Chuyển thành in hoa
        )}
      </Avatar>

      <div className="flex flex-col gap-2">
        <div>
          <p className="font-bold">{fullName}</p>
          <p className="text-dark-400 text-sm"> 4 mutual friends</p>
        </div>
        <div className="flex justify-between">
          <Button>Comfirm</Button>
          <Button>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default FriendReq;
