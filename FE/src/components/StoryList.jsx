import React from 'react';
import { Avatar, IconButton, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import StoryItem from './StoryItem';

const stories = [
  {
    name: 'Lap Phan',
    avatar: '/l.jpg', // Thay bằng URL avatar thật
    background:
      'https://anhcute.net/wp-content/uploads/2024/11/hinh-anh-nu-che-mat-cute.jpg', // Hình nền
  },
  {
    name: 'Duy Nguyen',
    avatar: '/d.jpg',
    background:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRamQwBHpWNzfSrSS5q_sSKxaPAn3Y_lwfXZOKA5i--p4hxwgm9hKhhvCQ3-ejC9pF7vEc&usqp=CAU',
  },
  {
    name: 'Hung Nguyen',
    avatar: '/h.jpg',
    background:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVhXcd1exvSscSi96fRePZ0K98dh7OszPofGZvbJj4bHOl-IXi7bfqPnPJ1pK2syAkXVA&usqp=CAU',
  },
];

const StoryList = () => {
  return (
    <div className="card flex flex-nowrap gap-4 overflow-x-auto p-4">
      {/* Add Story */}
      <div className="flex flex-col items-center">
        <div className="relative flex h-50 w-34 items-center justify-center rounded-lg bg-gray-800">
          <div className="absolute bottom-1">
            <div className="flex justify-center">
              <IconButton className="!bg-white !text-blue-500">
                <Add />
              </IconButton>
            </div>
            <div className="text-white">
              <Typography variant="caption">Add Story</Typography>
            </div>
          </div>
        </div>
      </div>
      {/* Story Items */}
      {stories.map((story, index) => {
        return <StoryItem key={index} story={story} index={index} />;
      })}
    </div>
  );
};

export default StoryList;
