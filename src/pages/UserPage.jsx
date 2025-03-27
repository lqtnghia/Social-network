import React from 'react';
import { Button, Avatar, Divider } from '@mui/material';
import { Add, CameraAlt as CameraAltIcon, Edit } from '@mui/icons-material';
import Post from '@components/Post';

const UserPage = () => {
  return (
    <div className="bg-primary-bgdark flex flex-col">
      <div className="bg-primary-dark w-[70%]">
        {/* Container cho ảnh bìa và avatar */}
        <div className="relative">
          {/* Ảnh bìa */}
          <div
            className="bg-primary-bgdark h-64 w-full rounded-sm bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(/sky.webp)` }}
          >
            <div className="absolute right-2 bottom-2 rounded bg-white">
              <Button variant="outlined" size="small">
                <CameraAltIcon fontSize="small" className="!mr-1" />
                Add cover photo
              </Button>
            </div>
          </div>

          {/* Avatar chồng lên ảnh bìa */}
          <div className="absolute bottom-0 left-4 translate-y-1/2">
            <Avatar
              className="relative"
              sx={{
                width: 160, // Kích thước lớn hơn
                height: 160,
                bgcolor: 'primary.main',
                border: '4px solid #1f2937', // Viền giống trong hình
                fontSize: '3rem', // Kích thước chữ lớn hơn
              }}
            >
              {'Nghĩa'.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
            </Avatar>
            <div
              className="absolute right-3 bottom-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-800 bg-gray-700 shadow-lg"
              style={{ transform: 'translate(10%, 10%)' }} // Dịch chuyển để nổi bật hơn
            >
              <CameraAltIcon sx={{ color: 'white', fontSize: 20 }} />
            </div>
          </div>
        </div>

        {/* Thông tin người dùng và nút hành động */}
        <div className="!mb-6 flex items-center justify-between !pt-3">
          <div className="!ml-48 flex flex-col">
            <p className="text-2xl font-bold text-white">
              Lê Quang Trọng Nghĩa
            </p>
            <p className="text-gray-400">583 friends</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: '#1b74e4',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
            >
              <Add fontSize="small" className="!mr-1" />
              Add to story
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: '#4b5563',
                color: 'white',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#374151',
                },
              }}
            >
              <Edit fontSize="small" className="!mr-1" />
              Edit profile
            </Button>
          </div>
        </div>

        <Divider
          sx={{
            borderColor: '#4b5563', // Màu xám nhạt
            marginY: 2, // Khoảng cách trên dưới
          }}
        />
        {/* Nội dung bên dưới */}
        <div className="text-white">Content</div>
      </div>
      <div className="bg-primary-dark w-[70%]">
        <Post />
      </div>
    </div>
  );
};

export default UserPage;
