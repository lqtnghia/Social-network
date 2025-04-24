// import { BorderColor, MoreHoriz, Search } from '@mui/icons-material';
// import { Avatar, Box, InputAdornment, List, TextField } from '@mui/material';
// import { useGetFriendsQuery } from '@services/rootApi';
// import React from 'react';

// const SideBar = () => {
//   const { data  } = useGetFriendsQuery({
//     limit: 10,
//     offset: 0,
//   });
//   const friends = data?.friends || [];
//   return (
//     <div className="scrollbar-custom !m-auto flex max-h-[calc(100vh-104px)] w-80 flex-col gap-4 overflow-y-auto">
//       <div className="flex justify-between !p-4">
//         <p className="text-xl font-bold">Chats</p>
//         <div className="flex gap-2">
//           <MoreHoriz />
//           <BorderColor />
//         </div>
//       </div>
//       <div>
//         <TextField
//           className="bg-primary-bgdark rounded-[20px]"
//           variant="outlined"
//           name="search"
//           placeholder="Search"
//           fullWidth
//           // value={searchTerm}
//           // onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') {
//               // navigate('/search/users', { state: { searchTerm } });
//             }
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Search className="text-slate-300" />
//               </InputAdornment>
//             ),
//           }}
//           sx={{
//             '& .MuiOutlinedInput-root': {
//               borderRadius: '20px',
//               borderColor: '#ccc',
//               height: '40px', // Reduce the height (default is around 56px)
//               '&:hover fieldset': {
//                 borderColor: 'primary-main',
//               },
//               '&.Mui-focused fieldset': {
//                 borderColor: 'primary-main',
//                 borderWidth: '2px',
//               },
//             },
//             '.MuiInputBase-input': {
//               paddingLeft: '10px',
//               paddingY: '8px', // Adjust vertical padding to reduce height
//               '::placeholder': {
//                 color: '#cad5e2',
//                 opacity: 1,
//               },
//             },
//           }}
//         />
//       </div>
//       <div>
//         <List className="flex flex-col gap-4 rounded-sm shadow">
//           {friends.map((friend) => (
//             <Box
//               className="flex"
//               sx={{
//                 padding: '8px 12px',
//                 borderRadius: '8px',
//                 transition: 'background-color 0.2s ease',
//                 '&:hover': {
//                   backgroundColor: '#f5f6f8',
//                   color: '#1a73e8',
//                 },
//               }}
//             >
//               <Avatar
//                 className="!bg-primary-main"
//                 sx={{ width: 50, height: 50, fontSize: 15, marginRight: 1 }}
//               >
//                 {friend.fullName
//                   .split(' ')
//                   .slice(-1)[0]
//                   .charAt(0)
//                   .toUpperCase()}
//               </Avatar>
//               <div className="flex flex-col justify-center">
//                 <p className="text-lg font-bold">{friend.fullName}</p>
//                 <p className="text-dark-400 text-sm">Hello is xin chào</p>
//               </div>
//             </Box>
//           ))}
//         </List>
//       </div>
//     </div>
//   );
// };

// export default SideBar;

import { BorderColor, MoreHoriz, Search } from '@mui/icons-material';
import { Avatar, Box, InputAdornment, List, TextField } from '@mui/material';
import {
  useGetConversationsQuery,
  useSearchUsersQuery,
} from '@services/rootApi';
import React, { useState } from 'react';

const SideBar = ({ selectedUserId, onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: conversations } = useGetConversationsQuery();
  const { data: searchResults } = useSearchUsersQuery(
    { searchQuery: searchTerm, limit: 10, offset: 0 },
    { skip: !searchTerm }, // Chỉ tìm kiếm khi có searchTerm
  );

  const handleSelectUser = (userId) => {
    onSelectUser(userId);
  };

  // Danh sách hiển thị: Ưu tiên kết quả tìm kiếm nếu có, nếu không thì hiển thị cuộc trò chuyện
  const displayList = searchTerm
    ? searchResults?.users || []
    : conversations || [];

  return (
    <div className="scrollbar-custom !m-auto flex max-h-[calc(100vh-104px)] w-80 flex-col gap-4 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between !p-4">
        <p className="text-xl font-bold">Chats</p>
        <div className="flex gap-2">
          <MoreHoriz />
          <BorderColor />
        </div>
      </div>

      {/* Tìm kiếm */}
      <div>
        <TextField
          className="bg-primary-bgdark rounded-[20px]"
          variant="outlined"
          name="search"
          placeholder="Tìm kiếm người dùng"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="text-slate-300" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              borderColor: '#ccc',
              height: '40px',
              '&:hover fieldset': {
                borderColor: 'primary-main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary-main',
                borderWidth: '2px',
              },
            },
            '.MuiInputBase-input': {
              paddingLeft: '10px',
              paddingY: '8px',
              '::placeholder': {
                color: '#cad5e2',
                opacity: 1,
              },
            },
          }}
        />
      </div>

      {/* Danh sách cuộc trò chuyện hoặc kết quả tìm kiếm */}
      <div>
        <List className="flex flex-col gap-4 rounded-sm shadow">
          {displayList.map((item) => {
            const userId = searchTerm ? item.id : item.sender._id;
            const fullName = searchTerm ? item.fullName : item.sender.fullName;
            const lastMessage = searchTerm
              ? 'Bắt đầu trò chuyện'
              : item.message.message;

            return (
              <Box
                key={userId}
                onClick={() => handleSelectUser(userId)}
                className={`flex cursor-pointer ${
                  selectedUserId === userId ? 'bg-blue-200' : ''
                }`}
                sx={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#f5f6f8',
                    color: '#1a73e8',
                  },
                }}
              >
                <Avatar
                  className="!bg-primary-main"
                  sx={{ width: 50, height: 50, fontSize: 15, marginRight: 1 }}
                >
                  {fullName.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
                </Avatar>
                <div className="flex flex-col justify-center">
                  <p className="text-lg font-bold">{fullName}</p>
                  <p className="text-dark-400 text-sm">{lastMessage}</p>
                </div>
              </Box>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default SideBar;
