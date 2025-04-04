// import React, { useState, useEffect } from 'react';
// import FriendRequestItem from './FriendRequestItem';
// import { useGetPendingFriendRequestsQuery } from '@services/rootApi';
// import { useSocketContext } from '@context/SocketProvider';

// const FriendRequest = () => {
//   const [showAll, setShowAll] = useState(false);
//   const { data = [], refetch } = useGetPendingFriendRequestsQuery();
//   const socket = useSocketContext();

//   useEffect(() => {
//     console.log('Socket in FriendRequest:', socket); // Debug socket
//     if (socket) {
//       socket.on('newFriendRequest', (friendRequestData) => {
//         console.log('New friend request received:', friendRequestData);
//         refetch();
//       });

//       return () => {
//         socket.off('newFriendRequest');
//       };
//     } else {
//       console.warn('Socket not available');
//     }
//   }, [socket, refetch]);

//   console.log('friend request', data);

//   return (
//     <div className="card scrollbar-custom !m-auto h-[320px] w-64 overflow-y-auto">
//       <div className="!mb-2 flex justify-between">
//         <p>Friend requests</p>
//         <p
//           className="text-primary-main hover:cursor-pointer"
//           onClick={() => setShowAll(!showAll)}
//         >
//           {showAll ? 'Show Less' : 'Show All'}
//         </p>
//       </div>
//       <div className="!space-y-4">
//         {(showAll ? data : data.slice(0, 3)).map((request) => (
//           <FriendRequestItem
//             fullName={request.sender.fullName}
//             key={request.sender.id}
//             id={request.sender.id}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FriendRequest;

import React, { useState, useEffect } from 'react';
import FriendRequestItem from './FriendRequestItem';
import { useGetPendingFriendRequestsQuery } from '@services/rootApi';
import { useSocketContext } from '@context/SocketProvider';
import { useSelector } from 'react-redux';

const FriendRequest = () => {
  const [showAll, setShowAll] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;
  const { data = [], refetch } = useGetPendingFriendRequestsQuery(undefined, {
    skip: !userId,
    pollingInterval: 0, // Tắt polling để tránh xung đột với socket
  });
  const socket = useSocketContext();

  useEffect(() => {
    console.log('Socket in FriendRequest:', socket);
    if (socket) {
      socket.on('connect', () => {
        console.log('Socket connected in FriendRequest:', socket.id);
      });

      socket.on('newFriendRequest', (friendRequestData) => {
        console.log('New friend request received:', friendRequestData);
        refetch(); // Làm mới dữ liệu
      });

      socket.on('connect_error', (error) => {
        console.error('Socket connect error in FriendRequest:', error.message);
      });

      return () => {
        socket.off('newFriendRequest');
        socket.off('connect');
        socket.off('connect_error');
      };
    } else {
      console.warn('Socket not available');
    }
  }, [socket, refetch]);

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, refetch]);

  console.log('friend request', data);

  return (
    <div className="card scrollbar-custom !m-auto h-[320px] w-64 overflow-y-auto">
      <div className="!mb-2 flex justify-between">
        <p>Friend requests</p>
        <p
          className="text-primary-main hover:cursor-pointer"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : 'Show All'}
        </p>
      </div>
      <div className="!space-y-4">
        {(showAll ? data : data.slice(0, 3)).map((request) => (
          <FriendRequestItem
            fullName={request.sender.fullName}
            key={request.sender.id}
            id={request.sender.id}
          />
        ))}
      </div>
    </div>
  );
};

export default FriendRequest;
