import React, { useState } from 'react';
import { Button, Avatar, Divider, Tabs, Tab } from '@mui/material';
import { Add, CameraAlt as CameraAltIcon, Edit } from '@mui/icons-material';
import PostList from '@components/Post/PostList';
import PostCreation from '@components/Post/PostCreation';
import { useUserInfo } from '@hooks/useUserInfo';

const UserPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const user = useUserInfo();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="bg-primary-bgdark flex flex-col">
      <div className="!m-auto w-[70%] bg-slate-700">
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
                width: 160,
                height: 160,
                bgcolor: 'primary.main',
                border: '4px solid #1f2937',
                fontSize: '3rem',
              }}
            >
              {user.fullName.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
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
            <p className="text-2xl font-bold text-white">{user.fullName}</p>
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
            borderColor: '#4b5563',
            marginY: 2,
          }}
        />
      </div>
      <div className="!m-auto w-[70%]">
        {/* Navigation Tabs */}
        <Tabs
          className="bg-slate-700"
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#1b74e4',
            },
            '& .MuiTab-root': {
              color: '#9ca3af',
              textTransform: 'none',
              fontWeight: 'bold',
              '&.Mui-selected': {
                color: '#ffffff',
              },
            },
          }}
        >
          <Tab label="Posts" />
          <Tab label="About" />
          <Tab label="Friends" />
          <Tab label="Photos" />
          <Tab label="Check-ins" />
          <Tab label="Sports" />
          <Tab label="More" />
        </Tabs>

        {/* Nội dung bên dưới (dựa trên tab được chọn) */}
        <div className="bg-slate-700 text-white">
          {activeTab === 0 && (
            <div className="!m-auto w-[80%]">
              <div className="!my-4">
                <PostCreation />
              </div>
              <div>
                <PostList />
              </div>
            </div>
          )}
          {/* Posts tab */}
          {activeTab === 1 && <div>About content goes here</div>}{' '}
          {activeTab === 2 && <div>Friends list goes here</div>}{' '}
          {activeTab === 3 && <div>Photos gallery goes here</div>}{' '}
          {activeTab === 4 && <div>Check-ins content goes here</div>}{' '}
          {activeTab === 5 && <div>Sports content goes here</div>}{' '}
          {activeTab === 6 && <div>More options go here</div>}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
