import { Avatar, List } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const FriendList = () => {
  return (
    <div className="card scrollbar-custom !mt-4 h-[333px] overflow-y-auto">
      <p>Contacts</p>
      <List className="flex flex-col gap-4 rounded-sm shadow">
        <Link
          to="/"
          className="flex items-center gap-1"
          sx={{
            '&:hover': {
              backgroundColor: '#f0f0f0',
              color: '#1a73e8',
            },
          }}
        >
          <Avatar
            className="!bg-primary-main"
            sx={{ width: 30, height: 30, fontSize: 15, marginRight: 1 }}
          >
            {'Nghĩa'.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <p className="text-[10px] font-bold">Lê Quang Trọng Nghĩa</p>
            <p className="text-dark-400 text-sm"></p>
          </div>
        </Link>
        <Link to="/" className="flex items-center gap-1">
          <Avatar
            className="!bg-primary-main"
            sx={{ width: 30, height: 30, fontSize: 15, marginRight: 1 }}
          >
            {'Nghĩa'.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <p className="text-[10px] font-bold">Lê Quang Trọng Nghĩa</p>
            <p className="text-dark-400 text-sm"></p>
          </div>
        </Link>
        <Link to="/" className="flex items-center gap-1">
          <Avatar
            className="!bg-primary-main"
            sx={{ width: 30, height: 30, fontSize: 15, marginRight: 1 }}
          >
            {'Nghĩa'.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <p className="text-[10px] font-bold">Lê Quang Trọng Nghĩa</p>
            <p className="text-dark-400 text-sm"></p>
          </div>
        </Link>
        <Link to="/" className="flex items-center gap-1">
          <Avatar
            className="!bg-primary-main"
            sx={{ width: 30, height: 30, fontSize: 15, marginRight: 1 }}
          >
            {'Nghĩa'.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <p className="text-[10px] font-bold">Lê Quang Trọng Nghĩa</p>
            <p className="text-dark-400 text-sm"></p>
          </div>
        </Link>
        <Link to="/" className="flex items-center gap-1">
          <Avatar
            className="!bg-primary-main"
            sx={{ width: 30, height: 30, fontSize: 15, marginRight: 1 }}
          >
            {'Nghĩa'.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <p className="text-[10px] font-bold">Lê Quang Trọng Nghĩa</p>
            <p className="text-dark-400 text-sm"></p>
          </div>
        </Link>
        <Link to="/" className="flex items-center gap-1">
          <Avatar
            className="!bg-primary-main"
            sx={{ width: 30, height: 30, fontSize: 15, marginRight: 1 }}
          >
            {'Nghĩa'.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <p className="text-[10px] font-bold">Lê Quang Trọng Nghĩa</p>
            <p className="text-dark-400 text-sm"></p>
          </div>
        </Link>
        <Link to="/" className="flex items-center gap-1">
          <Avatar
            className="!bg-primary-main"
            sx={{ width: 30, height: 30, fontSize: 15, marginRight: 1 }}
          >
            {'Nghĩa'.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <p className="text-[10px] font-bold">Lê Quang Trọng Nghĩa</p>
            <p className="text-dark-400 text-sm"></p>
          </div>
        </Link>
        <Link to="/" className="flex items-center gap-1">
          <Avatar
            className="!bg-primary-main"
            sx={{ width: 30, height: 30, fontSize: 15, marginRight: 1 }}
          >
            {'Nghĩa'.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <p className="text-[10px] font-bold">Lê Quang Trọng Nghĩa</p>
            <p className="text-dark-400 text-sm"></p>
          </div>
        </Link>
      </List>
    </div>
  );
};

export default FriendList;

// import { Avatar, List, styled } from '@mui/material';
// import React from 'react';
// import { Link } from 'react-router-dom';

// // Tạo styled component cho Link
// const StyledLink = styled(Link)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '1rem',
//   '&:hover': {
//     backgroundColor: '#f0f0f0',
//     color: '#1a73e8',
//   },
//   textDecoration: 'none', // Đảm bảo không có gạch chân
// }));

// const FriendList = () => {
//   return (
//     <div className="card scrollbar-custom !mt-4 h-[333px] overflow-y-auto">
//       <p>Contacts</p>
//       <List className="flex flex-col gap-4 rounded-sm shadow">
//         <StyledLink to="/">
//           <Avatar
//             className="!bg-primary-main"
//             sx={{ width: 30, height: 30, fontSize: 15, marginRight: 1 }}
//           >
//             {'Nghĩa'.split(' ').slice(-1)[0].charAt(0).toUpperCase()}
//           </Avatar>
//           <div>
//             <p className="text-[10px] font-bold">Lê Quang Trọng Nghĩa</p>
//             <p className="text-dark-400 text-sm"></p>
//           </div>
//         </StyledLink>
//         {/* Các Link khác */}
//       </List>
//     </div>
//   );
// };

// export default FriendList;
