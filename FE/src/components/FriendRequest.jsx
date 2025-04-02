import React from 'react';
import FriendRequestItem from './FriendRequestItem';
import { useGetPendingFriendRequestsQuery } from '@services/rootApi';
import { useState } from 'react';

const FriendRequest = () => {
  const [showAll, setShowAll] = useState(false);
  const { data = [] } = useGetPendingFriendRequestsQuery();
  console.log(data);
  return (
    <div className="card !m-auto w-64">
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
