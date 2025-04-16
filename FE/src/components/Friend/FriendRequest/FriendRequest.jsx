import React, { useState, useEffect } from 'react';
import FriendRequestItem from './FriendRequestItem';
import { useGetPendingFriendRequestsQuery } from '@services/rootApi';

const FriendRequest = () => {
  const [showAll, setShowAll] = useState(false);
  const { data: serverData = [], refetch } = useGetPendingFriendRequestsQuery();
  const [friendRequests, setFriendRequests] = useState(serverData);

  useEffect(() => {
    // console.log('serverData updated:', serverData);
    setFriendRequests(serverData);
  }, [serverData]);

  const handleRequestAccepted = (senderId) => {
    console.log('Removing request with senderId:', senderId);
    setFriendRequests((prevRequests) => {
      const updatedRequests = prevRequests.filter(
        (request) => request.sender.id !== senderId.toString(),
      );
      console.log('Updated friendRequests:', updatedRequests);
      return updatedRequests;
    });
    refetch();
  };

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
        {friendRequests.length === 0 ? (
          <p className="text-center text-gray-500">
            No pending friend requests
          </p>
        ) : (
          (showAll ? friendRequests : friendRequests.slice(0, 3)).map(
            (request) => (
              <FriendRequestItem
                fullName={request.sender.fullName}
                key={request.sender.id}
                id={request.sender.id}
                onRequestAccepted={handleRequestAccepted}
              />
            ),
          )
        )}
      </div>
    </div>
  );
};

export default FriendRequest;
