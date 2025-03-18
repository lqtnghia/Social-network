import { Comment, ThumbUp } from '@mui/icons-material';
import { Avatar, Button } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

const Post = ({
  fullName = 'Lê Quang Trọng Nghĩa',
  createAt = new Date(),
  content = 'Goal of football',
  image = 'https://assets.goal.com/images/v3/blt2aaca933046f8b00/Cristiano%20Ronaldo%20Portugal%202024%20(4).jpg?auto=webp&format=pjpg&width=3840&quality=60',
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
      <p className="!mb-1">{content}</p>
      {image && <img src={image} />}
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
