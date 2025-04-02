// import { Comment, ThumbUp } from '@mui/icons-material';
// import { Avatar, Button, Divider } from '@mui/material';
// import dayjs from 'dayjs';
// import React from 'react';

// const Post = ({
//   fullName = '',
//   createAt = new Date(),
//   content = '',
//   image = '',
//   likes = [],
//   comments = [],
// }) => {
//   return (
//     <div className="bg-primary-dark rounded !p-4 shadow">
//       <div className="!mb-3 flex gap-3">
//         <Avatar className="!bg-primary-main">
//           {fullName.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
//         </Avatar>
//         <div>
//           <p className="font-bold">{fullName}</p>
//           <p className="text-dark-400 text-sm">
//             {dayjs(createAt).format('DD/MM/YYYY HH:mm')}
//           </p>
//         </div>
//       </div>
//       <p className="!mb-2">{content}</p>
//       {image && (
//         <div className="flex justify-center">
//           <img src={image} className="max-h-[418px] max-w-[688px]" />
//         </div>
//       )}
//       <div className="!my-2 flex items-center justify-between">
//         <div className="flex items-center gap-1 text-sm">
//           <ThumbUp fontSize="small" className="text-primary-main" />
//           <p>{likes.length}</p>
//         </div>
//         <div className="text-sm">
//           <p>{comments.length} comments</p>
//         </div>
//       </div>
//       <div className="!border-dark-200 flex !border-t !border-b !py-1 text-sm">
//         <Button size="small" className="!text-dark-100 flex-1">
//           <ThumbUp fontSize="small" className="!mr-1" /> Like
//         </Button>
//         <Button size="small" className="!text-dark-100 flex-1">
//           <Comment fontSize="small" className="!mr-1" /> Comment
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Post;

import { Comment, ThumbUp } from '@mui/icons-material';
import { Avatar, Button, Divider, Menu, MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';

const Post = ({
  fullName = '',
  createAt = new Date(),
  content = '',
  image = '',
  likes = [],
  comments = [],
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [privacy, setPrivacy] = useState('Công khai');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePrivacyChange = (value) => {
    setPrivacy(value);
    handleClose();
  };

  return (
    <div className="bg-primary-dark rounded !p-4 shadow">
      <div className="!mb-3 flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <Avatar className="!bg-primary-main">
            {fullName.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <p className="font-bold">{fullName}</p>
            <p className="text-dark-400 text-sm">
              {dayjs(createAt).format('DD/MM/YYYY HH:mm')}
            </p>
          </div>
        </div>
        <div>
          <Button
            aria-controls="privacy-menu"
            aria-haspopup="true"
            onClick={handleClick}
            size="small"
            className="!text-dark-100"
          >
            {privacy} ▼
          </Button>
          <Menu
            id="privacy-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              className: 'bg-primary-dark text-white',
            }}
          >
            <MenuItem
              onClick={() => handlePrivacyChange('Công khai')}
              className="hover:bg-primary-main"
            >
              Công khai
            </MenuItem>
            <MenuItem
              onClick={() => handlePrivacyChange('Bạn bè')}
              className="hover:bg-primary-main"
            >
              Bạn bè
            </MenuItem>
            <MenuItem
              onClick={() => handlePrivacyChange('Chỉ mình tôi')}
              className="hover:bg-primary-main"
            >
              Chỉ mình tôi
            </MenuItem>
          </Menu>
        </div>
      </div>
      <p className="!mb-2">{content}</p>
      {image && (
        <div className="flex justify-center">
          <img src={image} className="max-h-[418px] max-w-[688px]" />
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
