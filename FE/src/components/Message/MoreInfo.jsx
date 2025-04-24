// import { AccountCircle, Notifications, SavedSearch } from '@mui/icons-material';
// import { Avatar, IconButton } from '@mui/material';
// import React from 'react';

// const MoreInfo = () => {
//   return (
//     <div className="scrollbar-custom !m-auto flex max-h-[calc(100vh-104px)] w-80 flex-col gap-4 overflow-y-auto">
//       <div className="flex flex-col items-center gap-1">
//         <Avatar
//           className="!bg-primary-main"
//           sx={{ width: 100, height: 100, fontSize: 15, marginRight: 1 }}
//         >
//           {'Nguyễn Gia Hưng'.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
//         </Avatar>
//         <p className="text-lg font-bold">Nguyễn Gia Hưng</p>
//         <p className="text-sm">Active now</p>
//       </div>
//       <div className="flex justify-center gap-4">
//         <IconButton size="medium" sx={{ backgroundColor: '#273352' }}>
//           <AccountCircle fontSize="medium" />
//         </IconButton>
//         <IconButton size="medium" sx={{ backgroundColor: '#273352' }}>
//           <Notifications fontSize="medium" />
//         </IconButton>
//         <IconButton size="medium" sx={{ backgroundColor: '#273352' }}>
//           <SavedSearch fontSize="medium" />
//         </IconButton>
//       </div>
//     </div>
//   );
// };

// export default MoreInfo;

import { AccountCircle, Notifications, SavedSearch } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import { useGetUserByIdQuery } from '@services/rootApi';
import React from 'react';

const MoreInfo = ({ selectedUserId }) => {
  const {
    data: user,
    isLoading,
    error,
  } = useGetUserByIdQuery(selectedUserId, {
    skip: !selectedUserId,
  });

  if (!selectedUserId) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Chọn một người dùng để xem thông tin</p>
      </div>
    );
  }

  if (isLoading) {
    return <div className="p-4 text-center">Đang tải thông tin...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Lỗi khi tải thông tin: {error.message}
      </div>
    );
  }

  return (
    <div className="scrollbar-custom !m-auto flex max-h-[calc(100vh-104px)] w-80 flex-col gap-4 overflow-y-auto">
      <div className="flex flex-col items-center gap-1">
        <Avatar
          className="!bg-primary-main"
          src={user?.avatar}
          sx={{ width: 100, height: 100, fontSize: 15, marginRight: 1 }}
        >
          {!user?.avatar &&
            user?.fullName?.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
        </Avatar>
        <p className="text-lg font-bold">{user?.fullName || 'Người dùng'}</p>
        <p className="text-sm">Active now</p>
      </div>
      <div className="flex justify-center gap-4">
        <IconButton size="medium" sx={{ backgroundColor: '#273352' }}>
          <AccountCircle fontSize="medium" />
        </IconButton>
        <IconButton size="medium" sx={{ backgroundColor: '#273352' }}>
          <Notifications fontSize="medium" />
        </IconButton>
        <IconButton size="medium" sx={{ backgroundColor: '#273352' }}>
          <SavedSearch fontSize="medium" />
        </IconButton>
      </div>
    </div>
  );
};

export default MoreInfo;
