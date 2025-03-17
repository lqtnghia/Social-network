import React from 'react';
import FriendReq from './FriendReq';

const FriendRequest = () => {
  return (
    <div className="rounded bg-white !p-4 shadow">
      <div className="!mb-2 flex justify-between">
        <p>Friend requests</p>
        <p className="text-primary-main hover:cursor-pointer">See all</p>
      </div>
      <div className="flex flex-col">
        <FriendReq fullName="Phan Quốc Lập" image="/l.jpg" />
        <FriendReq fullName="Nguyễn Khánh Duy" image="/d.jpg" />
        <FriendReq fullName="Nguyễn Quang Hùng" image="/h.jpg" />
      </div>
    </div>
  );
};

export default FriendRequest;
