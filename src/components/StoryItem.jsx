import { Avatar, Typography } from '@mui/material';
import React from 'react';

const StoryItem = ({ story, index }) => {
  return (
    <div key={index} className="flex flex-col items-center">
      <div
        className="relative flex h-50 w-34 items-center justify-center rounded-lg bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${story.background})` }}
      >
        <div className="absolute bottom-1">
          <div className="flex justify-center">
            <Avatar src={story.avatar} />
          </div>
          <div className="font-bold text-white">
            <Typography variant="caption">{story.name}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryItem;
