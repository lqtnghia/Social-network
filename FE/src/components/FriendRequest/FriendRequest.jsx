import React, { useState, useEffect } from 'react';
import FriendRequestItem from './FriendRequestItem';
import { useGetPendingFriendRequestsQuery } from '@services/rootApi';
import { useSocketContext } from '@context/SocketProvider';

const FriendRequest = () => {
  const [showAll, setShowAll] = useState(false);
  const { data = [], refetch } = useGetPendingFriendRequestsQuery();
  const socket = useSocketContext();

  useEffect(() => {
    console.log('Socket in FriendRequest:', socket); // Debug socket
    if (socket) {
      socket.on('newFriendRequest', (friendRequestData) => {
        console.log('New friend request received:', friendRequestData);
        refetch();
      });

      return () => {
        socket.off('newFriendRequest');
      };
    } else {
      console.warn('Socket not available');
    }
  }, [socket, refetch]);

  return (
    <div className="card !m-auto max-h-[320px] w-64 overflow-y-auto">
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
