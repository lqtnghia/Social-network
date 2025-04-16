import Loading from '@components/Loading/Loading';
import { Avatar, List } from '@mui/material';
import { useGetFriendsQuery } from '@services/rootApi';
import React from 'react';
import FriendMessageItem from './FriendMessageItem';

const FriendList = () => {
  const { data, isLoading, error } = useGetFriendsQuery({
    limit: 10,
    offset: 0,
  });
  // console.log('Friends data:', data);
  // console.log('Error:', error);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.log('Error details:', error);
    return (
      <div>
        Lỗi khi tải danh sách bạn bè:{' '}
        {error?.data?.message || error?.message || 'Đã xảy ra lỗi'}
      </div>
    );
  }

  const friends = data?.friends || [];

  return (
    <div className="card scrollbar-custom !mt-4 h-[333px] overflow-y-auto">
      <p>Contacts</p>
      <List className="flex flex-col gap-4 rounded-sm shadow">
        {friends.length === 0 ? (
          <p>Không có bạn bè nào để hiển thị.</p>
        ) : (
          friends.map((friend) => (
            <FriendMessageItem key={friend.id} friend={friend} />
          ))
        )}
      </List>
    </div>
  );
};

export default FriendList;
