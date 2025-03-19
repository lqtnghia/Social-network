import { Comment, ThumbUp } from '@mui/icons-material';
import { Avatar, Button, Divider } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

const Post = ({
  fullName = '',
  createAt = new Date(),
  content = '',
  image = '',
  likes = [],
  comments = [],
}) => {
  return (
    <div className="rounded bg-white !p-4 shadow">
      <div className="!mb-3 flex gap-3">
        <Avatar className="!bg-primary-main">
          {
            fullName
              .split(' ') // Tách chuỗi thành mảng các từ
              .slice(-1)[0] // Lấy từ cuối cùng
              .charAt(0) // Lấy ký tự đầu tiên của từ cuối cùng
              .toUpperCase() // Chuyển thành in hoa
          }
        </Avatar>
        <div>
          <p className="font-bold">{fullName}</p>
          <p className="text-dark-400 text-sm">
            {dayjs(createAt).format('DD/MM/YYYY HH:mm')}
          </p>
        </div>
      </div>
      <p className="!mb-2">{content}</p>
      {image && (
        <div className="flex justify-center">
          <img src={image} />
        </div>
      )}
      <div className="!my-2 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
          <ThumbUp fontSize="small" className="text-primary-main" />
          <p>{likes.length}</p>
        </div>
        <div className="text-sm">
          <p>{comments.length} comments</p>
        </div>
      </div>
      <div className="!border-dark-200 flex !border-t !border-b !py-1 text-sm">
        <Button size="small" className="!text-dark-100 flex-1">
          <ThumbUp fontSize="small" className="!mr-1" /> Like
        </Button>
        <Button size="small" className="!text-dark-100 flex-1">
          <Comment fontSize="small" className="!mr-1" /> Comment
        </Button>
      </div>
    </div>
  );
};

export default Post;
