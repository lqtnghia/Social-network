// import React, { useState, useEffect } from 'react';
// import FriendRequestItem from './FriendRequestItem';
// import { useGetPendingFriendRequestsQuery } from '@services/rootApi';
// import { useSelector } from 'react-redux';

// const FriendRequest = () => {
//   const [showAll, setShowAll] = useState(false);
//   const user = useSelector((state) => state.auth.user);
//   const userId = user?.id;
//   const { data = [], refetch } = useGetPendingFriendRequestsQuery(undefined, {
//     skip: !userId,
//     pollingInterval: 30000, // Làm mới dữ liệu mỗi 30 giây
//   });

//   // Làm mới dữ liệu khi userId thay đổi
//   useEffect(() => {
//     if (userId) {
//       refetch();
//     }
//   }, [userId, refetch]);

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

import React from 'react';
import FriendRequestItem from './FriendRequestItem';
import { useGetPendingFriendRequestsQuery } from '@services/rootApi';
import { useState } from 'react';

const FriendRequest = () => {
  const [showAll, setShowAll] = useState(false);
  const { data = [] } = useGetPendingFriendRequestsQuery();
  console.log(data);
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
