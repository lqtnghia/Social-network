// import React from 'react';
// import FriendRequestItem from './FriendRequestItem';
// import { useGetPendingFriendRequestsQuery } from '@services/rootApi';
// import { useState } from 'react';
// import { useSocketContext } from '@context/SocketProvider';
// import { useEffect } from 'react';

// const FriendRequest = () => {
//   const [showAll, setShowAll] = useState(false);
//   const { data = [] } = useGetPendingFriendRequestsQuery();
//   const [requests, setRequests] = useState(data);
//   const { socket } = useSocketContext();
//   // console.log('Danh sách gửi kến bạn', data);

//   useEffect(() => {
//     setRequests(data);
//   }, [data]);

//   useEffect(() => {
//     socket.on('receive-friend-request', (newRequest) => {
//       console.log('Nhận yêu cầu kết bạn mới:', newRequest);
//       // Cập nhật lại danh sách yêu cầu kết bạn
//       setRequests((preRequests) => [
//         ...preRequests,
//         {
//           sender: {
//             id: newRequest.senderId,
//             fullName: newRequest.fullName,
//             image: newRequest.image,
//           },
//         },
//       ]);
//       // Có thể hiện thông báo ở đây
//       alert(`Bạn nhận được yêu cầu kết bạn từ ${newRequest.fullName}`);
//     });

//     return () => {
//       socket.off('receive-friend-request');
//     };
//   }, [socket]);

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
//         {(showAll ? requests : requests.slice(0, 3)).map((request) => (
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

import React, { useEffect, useState } from 'react';
import FriendRequestItem from './FriendRequestItem';
import { useGetPendingFriendRequestsQuery } from '@services/rootApi';
import { useSocketContext } from '@context/SocketProvider';

const FriendRequest = () => {
  const [showAll, setShowAll] = useState(false);
  const { data = [] } = useGetPendingFriendRequestsQuery();
  const [requests, setRequests] = useState(data);
  const { socket } = useSocketContext();

  // Đồng bộ danh sách yêu cầu kết bạn từ API với state khi data thay đổi
  useEffect(() => {
    console.log('Initial data from useGetPendingFriendRequestsQuery:', data);
    setRequests(data);
  }, [data]);

  // Lắng nghe sự kiện nhận yêu cầu kết bạn realtime
  useEffect(() => {
    if (socket) {
      const handleReceiveFriendRequest = (newRequest) => {
        console.log('Nhận yêu cầu kết bạn mới:', newRequest);
        // Cập nhật lại danh sách yêu cầu kết bạn
        setRequests((prevRequests) => {
          const updatedRequests = [
            ...prevRequests,
            {
              sender: {
                id: newRequest.senderId,
                fullName: newRequest.fullName,
                image: newRequest.image,
              },
            },
          ];
          console.log('Updated requests:', updatedRequests);
          return updatedRequests;
        });
        // Hiển thị thông báo
        alert(`Bạn nhận được yêu cầu kết bạn từ ${newRequest.fullName}`);
      };

      console.log('Socket.IO: Registering receive-friend-request listener');
      socket.on('receive-friend-request', handleReceiveFriendRequest);

      // Đăng ký lại listener sau khi reconnect
      socket.on('connect', () => {
        console.log(
          'Socket.IO: Reconnected, re-registering receive-friend-request listener',
        );
        socket.on('receive-friend-request', handleReceiveFriendRequest);
      });

      // Log trạng thái kết nối
      socket.on('connect', () => {
        console.log('Socket.IO: Connected');
      });

      socket.on('disconnect', (reason) => {
        console.log('Socket.IO: Disconnected, reason:', reason);
      });

      // Log tất cả sự kiện nhận được để debug
      socket.onAny((event, ...args) => {
        console.log(`Socket.IO: Received event: ${event}`, args);
      });

      return () => {
        console.log('Socket.IO: Unregistering receive-friend-request listener');
        socket.off('receive-friend-request', handleReceiveFriendRequest);
        socket.off('connect');
        socket.off('disconnect');
        socket.offAny();
      };
    } else {
      console.error('Socket is not available');
    }
  }, [socket]);

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
        {console.log('Rendering requests:', requests)}
        {(showAll ? requests : requests.slice(0, 3)).map((request) => (
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
